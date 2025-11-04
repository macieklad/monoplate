import { z } from "zod";

const serverConfigSchema = z.object({
  DEV: z.boolean().optional().default(false),
  DATABASE_URL: z.string(),
});

export const config = serverConfigSchema.parse({
  DEV: import.meta.env.DEV,
  DATABASE_URL: process.env.DATABASE_URL,
});
