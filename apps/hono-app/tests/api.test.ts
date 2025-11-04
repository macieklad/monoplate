import { parseResponse } from "hono/client";
import { testClient } from "hono/testing";
import app, { type ApiType } from "~/server/app";
import { expect, test } from "vitest";

test("User list should be fetched", async () => {
  const request = testClient<ApiType>(app);

  const response = await request.api.users.$get();
  const users = await parseResponse(response);

  expect(response.status).toBe(200);
  expect(users.at(0)).toEqual({
    id: expect.any(Number),
    name: expect.any(String),
    age: expect.any(Number),
    email: expect.any(String),
  });
});
