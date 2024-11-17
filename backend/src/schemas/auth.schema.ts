import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(80, "Name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Email address is required" })
    .max(50, "Email address is too long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must not exceed 10 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Email address is required" })
    .min(1, "Email address is required")
    .max(50, "Email address is too long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .max(10, "Password must not exceed 10 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
});
