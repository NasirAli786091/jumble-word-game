import * as z from "zod";

export const registerSchema = z.object({
    username: z.string().trim()
        .min(3, "*small")
        .max(10, "*big"),
    email: z.email("*required"),
    password: z.string()
        .min(4, "*small"),
    confirmPassword:  z.string()
        .min(4, "*small") 
}).refine((data) => data.password === data.confirmPassword, {
    message: "doesn't match",
    path: ["confirmPassword"],
})