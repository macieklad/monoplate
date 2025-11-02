import { inngest, logSteps } from "../../modules/inngest";
import { defineEventHandler } from "nitro/h3";
import { InngestCommHandler, type ServeHandlerOptions } from "inngest";

const serve = (options: ServeHandlerOptions) => {
  const handler = new InngestCommHandler({
    frameworkName: "edge",
    fetch: fetch.bind(globalThis),
    ...options,
    handler: (req: Request) => {
      return {
        body: () => req.json(),
        headers: (key) => req.headers.get(key),
        method: () => req.method,
        url: () => new URL(req.url, `https://${req.headers.get("host") || ""}`),
        transformResponse: ({ body, status, headers }) => {
          return new Response(body, { status, headers });
        },
      };
    },
  });

  return handler.createHandler();
};

const handler = serve({
  client: inngest,
  functions: [logSteps],
});

export default defineEventHandler((event) => handler(event.req));
