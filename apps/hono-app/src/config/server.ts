import { z } from "zod";

const serverConfigSchema = z.object({
  DATABASE_URL: z.string(),
});

export const config = serverConfigSchema.parse(process.env);
