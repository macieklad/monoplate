import { describeRoute, resolver, validator } from "hono-openapi";
import { createHandlers } from "~/server/modules/hono";
import z from "zod";
import { db } from "~/database";
import { usersTable } from "~/database/schema";

const createUserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string(),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  email: z.string(),
});

export const createUserHandlers = createHandlers(
  describeRoute({
    description: "Create new user",

    responses: {
      200: {
        description: "Successful response",
        content: {
          "text/json": { schema: resolver(createUserResponseSchema) },
        },
      },
    },
  }),
  validator("json", createUserSchema),
  async (c) => {
    const user = c.req.valid("json");
    const [newUser] = await db.insert(usersTable).values(user).returning();
    return c.json<z.infer<typeof createUserResponseSchema>>(newUser);
  }
);

export const getUsersHandlers = createHandlers(
  describeRoute({
    description: "Get all users",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "text/json": { schema: resolver(createUserResponseSchema) },
        },
      },
    },
  }),
  async (c) => {
    const users = await db.select().from(usersTable);
    return c.json<z.infer<typeof createUserResponseSchema>[]>(users);
  }
);
