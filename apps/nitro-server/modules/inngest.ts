import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "nitro-server",
});

export const logSteps = inngest.createFunction(
  { id: "log-steps" },
  { event: "app/log-steps" },
  async ({ step, runId }) => {
    await step.run("first-step", async () => {
      console.log("First step");
    });

    await step.waitForEvent("wait-for-approval", {
      event: "app/approval-event",
      timeout: "1d",
      if: `async.data.runId == '${runId}'`,
    });

    await step.run("second-step", async () => {
      console.log("Second step");
    });
  }
);
