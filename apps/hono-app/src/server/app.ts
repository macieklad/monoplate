import path from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import { requestId } from "hono/request-id";
import { createUserHandlers, getUsersHandlers } from "./handlers/users";
import { requestLoggerMiddleware } from "./middleware/requestLogger";
import { createApp, errorHandler } from "./modules/hono";
import { render } from "./render";
import { openAPIRouteHandler } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";

const app = createApp();

/** MIDDLEWARES */
app.use(requestId());
app.use(requestLoggerMiddleware);

/** API ROUTES */
const api = createApp()
  .basePath("/api")
  .get("/users", ...getUsersHandlers)
  .post("/users", ...createUserHandlers);

export type ApiType = typeof api;

app.route("/", api);
app.get(
  "/openapi",
  openAPIRouteHandler(api, {
    documentation: {
      info: {
        title: "Hono API",
        version: "1.0.0",
        description: "Greeting API",
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  })
);
app.get(
  "/reference",
  Scalar(() => {
    return {
      url: "/openapi",
      proxyUrl: "https://proxy.scalar.com",
    };
  })
);

/** APP RENDERING AND STATIC ASSETS */
app.use(
  "/*",
  serveStatic({
    root: import.meta.env.PROD
      ? path.resolve(process.cwd(), "dist/public")
      : path.resolve(process.cwd(), "public"),
  })
);

app.all("*", ({ req }) => {
  if (req.path.split("/").at(-1)?.includes(".")) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  return render({ request: req.raw });
});

app.onError(errorHandler);

export default app;
