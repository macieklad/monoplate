import path from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { render } from "./render";
import { db } from "~/database";
import { usersTable } from "~/database/schema";
import z from "zod";
import { sValidator } from "@hono/standard-validator";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string(),
});

const app = new Hono();

app.use(logger());

const api = new Hono()
  .basePath("/api")
  .get("/users", async (c) => {
    const users = await db.select().from(usersTable);

    return c.json(users);
  })
  .post("/users", sValidator("json", userSchema), async (c) => {
    const user = c.req.valid("json");
    const newUser = await db.insert(usersTable).values(user);
    return c.json(newUser);
  });

app.route("/", api);

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

export default app;

export type ApiType = typeof api;
