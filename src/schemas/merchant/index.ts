import { z } from "zod";

export const formSchema = z.object({
    name: z.string().nonempty("Value is required"),
    phoneNumber: z
        .string()
        .nonempty("Value is required")
        .regex(/^(\+?95|0?9)\d{7,9}$/, "Invalid phone number"),
    stateId: z.string().nonempty("Value is required"),
    townshipId: z.string().nonempty("Value is required"),
    description: z.string().optional().nullable()
});

export type FormSchema = z.infer<typeof formSchema>;