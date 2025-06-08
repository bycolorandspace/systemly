import { z } from "zod";

export const LogInFormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const SignUpFormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  /*
  Mix of uppercase & lowercase letters
Minimum 7 characters long
Contain at least 1 number
  */
  password: z
    .string()
    .min(7, {
      message: "Password must be at least 7 characters.",
    })
    .refine((val) => /[A-Z]/.test(val) && /[a-z]/.test(val), {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number.",
    }),
});
