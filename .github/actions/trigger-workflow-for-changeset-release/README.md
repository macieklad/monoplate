# Trigger workflow for released changeset package

An action which triggers specified workflow for packages released by [changesets](https://github.com/changesets/changesets).

## Usage

```yaml
jobs:
	deploy:
		steps:
      - name: Deploy app if it was released
				uses: ./.github/actions/trigger-workflow-for-changset-release@master
				# You can skip this action with changeset_action_step_id.outputs.published
				if: ${{ steps.changesets.outputs.published }}
				with:
					released_packages: ${{ steps.changesets.outputs.publishedPackages }}
					github_token: ${{ secrets.GITHUB_TOKEN }}
					package: package-json-name
					# Takes any valid workflow path, including external workflows
					workflow: deploy-app.yaml
					workflow_inputs: |
						{
							"branch": "refs/tags/{package}@{version}"
						}
```

## How it works

When you run a `https://github.com/changesets/action` action like this:

```yaml
steps:
	- id: changesets
		name: Create Release Pull Request
		uses: changesets/action@v1
		env:
			GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

It will output a list of packages that were released, together with their versions. You can use this action to trigger a workflow for each of the released packages. For example you can deploy your app when it has a new version available.

Our action takes `workflow_inputs` encoded as JSON, they will be passed as inputs to the triggered workflow. Each (not nested) value of the JSON object can have placeholders `{package}` and `{version}` which will be replaced with the package name and version respectively.

```yaml
jobs:
  deploy:
    steps:
      - name: Deploy app if it was released
      uses: ./.github/actions/trigger-workflow-for-changset-release@master
      # You can skip this action with changeset_action_step_id.outputs.published
      if: ${{ steps.changesets.outputs.published }}
      with:
        released_packages: ${{ steps.changesets.outputs.publishedPackages }}
        github_token: ${{ secrets.GITHUB_TOKEN }}
        package: package-json-name
        # Takes any valid workflow path, including external workflows
        workflow: deploy-app.yaml
        workflow_inputs: |
          {
          	"branch": "refs/tags/{package}@{version}"
          }
```

You may update your `.changesets/config.json` to also version your private packages

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.1/schema.json",
  "privatePackages": {
    "version": true,
    "tag": true
  }
}
```

## Inputs

| parameter         | description                                                                                                                           | required | default             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- | ------- | ------ |
| github_token      | GitHub Token used for authentication, make sure it has access to trigger actions in the repository where your target workflow resides | `true`   |                     |
| released_packages | JSON array containing objects with package name and version                                                                           | `true`   |                     |
| package           | Package name that will cause the workflow to be triggered after the package was released                                              | `true`   |                     |
| workflow          | Path to the workflow file that will be triggered                                                                                      | `true`   |                     |
| package           | Package name that will cause the workflow to be triggered after the package was released                                              | `true`   |                     |
| owner             | Owner of the repo where workflow resides, defaults to the current repository                                                          | `false`  | github.context.repo |
| repo              | Repository where workflow resides, defaults to the current repository                                                                 | `false`  | github.context.repo | `false` | master |
| ref               | Repository ref that will be used to trigger the workflow, defaults to the master                                                      | `false`  | master              |
| workflow_inputs   | Workflow inputs that will be passed to the triggered workflow, encoded as JSON object                                                 | `false`  | `{}`                |
| ignored_versions  | JS Regexp, if it matches the released package version, the workflow will not be triggered                                             | `false`  |                     |

## Outputs

| output             | description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| workflow_triggered | A boolean indicating if the workflow for the package was triggered, because it may have been ignored |
| package_version    | A full version string of the package that the workflow was called for, e.g. `package@X.Y.Z`          |

## Contributing

This is a javascript action. To run it without installing node packages, you package it with `@vercel/ncc`, as per official github docs. So before creating a pull request, run `pnpm build` in the action directory, and commit the `index.mjs` file in the `bin` directory. The one in the action root is a source file, and the one in `bin`, an executable. Running the build without installing packages first will succeed, but the dependencies bundling will fail and this will be only detectable in production workflow call, when requiring a dependency will fail.

## Testing locally

To test the action locally, you can run it like a node script. Inputs in github actions are mapped from env in form of `INPUT_YOUR_INPUT_NAME_UPPER_SNAKE_CASED`.

To pass a variable from your shell env, you can call `env "ENV_TO_SET=$VARIABLE` inline with other variables.

A complete example will look like this

```bash
INPUT_YOUR_INPUT=airhelp env "INPUT_WITH_VARIABLE=$GITHUB_TOKEN" node index.mjs
```
