import { z } from "zod";

export const formSchema = z.object({
  value: z.string().nonempty("Value is required"),
  valueMM: z.string().optional().nullable(),
  description: z.string().optional().nullable()
});

export type FormSchema = z.infer<typeof formSchema>;