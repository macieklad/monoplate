import { createMiddleware } from "../modules/hono";
import { logger } from "../modules/log";

export const requestLoggerMiddleware = createMiddleware(async (c, next) => {
  const { method, url } = c.req;
  const path = url.slice(url.indexOf("/", 8));
  const requestId = c.get("requestId");

  const start = process.hrtime();

  await next();

  const duration = process.hrtime(start);

  logger.info(
    {
      id: requestId,
      status: c.res.status,
      durationMs: `${duration[0] * 1000 + duration[1] / 1000000}`,
    },
    `[${method}] ${path} >> Request finished`
  );
});
