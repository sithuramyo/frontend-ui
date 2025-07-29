import { z } from "zod";

export const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    price: z.coerce
      .number({ invalid_type_error: "Price must be a number" })
      .min(1000, "Price must be at least 1000"),
    sizeId: z.string().optional().nullable(),
    colorIds: z.array(z.string()).optional().nullable(),
    packageId: z.string().optional().nullable(),
    madeInId: z.string().optional().nullable(),
  });

export type FormSchema = z.infer<typeof formSchema>;