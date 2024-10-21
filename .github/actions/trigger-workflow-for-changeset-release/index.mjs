import core from '@actions/core';
import github from '@actions/github';
import z from 'zod';

const context = github.context;
const releasedPackages = core.getInput('released_packages', { required: true });
const deployedPackage = core.getInput('package');
const githubToken = core.getInput('github_token', { required: true });
const workflow = core.getInput('workflow', { required: true });
const owner = core.getInput('owner') || context.repo.owner;
const repo = core.getInput('repo') || context.repo.repo;
const ref = core.getInput('ref') || 'master';
const workflowInputs = core.getInput('workflow_inputs') || '{}';
const ignoredVersions = core.getInput('ignored_versions') || '';

const octokit = github.getOctokit(githubToken);

const manifestSchema = z.array(
  z.object({
    name: z.string(),
    version: z.string(),
  }),
);

await run();

async function run() {
  let metadata;
  try {
    core.info('Parsing released packages...');
    metadata = parseReleasedPackages();
  } catch (error) {
    core.setFailed(`Validation of released packages failed: ${error.message}`);
    return;
  }

  if (metadata.ignored || !metadata.version) {
    core.info('No matching package found in released packages.');
    core.setOutput('workflow_triggered', true);
    core.setOutput('package_version', false);
    return;
  }

  try {
    core.info('Starting workflow dispatch...');
    core.info(`owner: ${owner}`);
    core.info(`repo: ${repo}`);
    core.info(`workflow_id: ${workflow}`);
    core.info(`ref: ${ref}`);
    core.info(`inputs: ${JSON.stringify(formattedWorkflowInputs(metadata))}`);
    core.info(`package_version: ${metadata.name}@${metadata.version}`);
    await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflow,
      ref,
      inputs: formattedWorkflowInputs(metadata),
    });
  } catch (error) {
    core.setFailed(`Triggering workflow failed: ${error.message}`);
    return;
  }

  core.info('Workflow dispatch successfully triggered.');
  core.setOutput('workflow_triggered', true);
  core.setOutput('package_version', metadata.version);
}

function formattedWorkflowInputs(metadata) {
  let inputs = JSON.parse(workflowInputs);
  for (const [key, value] of Object.entries(inputs)) {
    inputs[key] =
      typeof value === 'string'
        ? value.replace('{version}', metadata.version)
        : value;
    inputs[key] =
      typeof value === 'string'
        ? inputs[key].replace('{package}', metadata.name)
        : value;
  }
  return inputs;
}

function parseReleasedPackages() {
  core.info(`Input to parse: ${releasedPackages}`);
  const manifest = JSON.parse(releasedPackages);
  const data = manifestSchema.parse(manifest);

  for (const { name, version } of data) {
    if (
      ignoredVersions &&
      version &&
      new RegExp(ignoredVersions).test(version)
    ) {
      core.info(
        `Ignoring version: ${version} for ${deployedPackage}, regex: ${ignoredVersions} matched`,
      );
      return { ignored: true, name: undefined, version: undefined };
    }

    if (name === deployedPackage) {
      core.info(
        `Found version that will trigger dispatch for ${deployedPackage}: ${version}`,
      );
      return { ignored: false, name, version };
    }
  }
  return { ignored: false, name: undefined, version: undefined };
}
