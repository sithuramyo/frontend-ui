import { z } from "zod";


export const formSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters" }),
  centreCode: z.string().min(1, "Centre is required")
});
