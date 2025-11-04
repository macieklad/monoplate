import type { ErrorHandler } from "hono";
import { createFactory } from "hono/factory";
import { createErrorDiagnoser, createErrorProcessor } from "./errors";
import { logger } from "./log";

export const { createMiddleware, createHandlers, createApp } = createFactory();

const processError = createErrorProcessor({
  logger,
  diagnoser: createErrorDiagnoser(),
});

export const errorHandler: ErrorHandler = (err, c) =>
  processError(err, c.req.raw);
