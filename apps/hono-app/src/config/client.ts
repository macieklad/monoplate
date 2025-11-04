import { z } from "zod";

const clientConfigSchema = z.object({
  VITE_API_URL: z.string().default("http://localhost:3000"),
});

export const config = clientConfigSchema.parse(import.meta.env);
