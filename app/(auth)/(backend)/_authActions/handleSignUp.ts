"use server"

import { registerSchema } from "@/lib/authSchemas/signUp/sign-up";
import * as z from "zod";
import { prisma } from "@/lib/prisma/prisma";
import bcryptjs from "bcryptjs";

type RegisterSchemaData = z.infer<typeof registerSchema>;

export const handleSignUp = async (data: RegisterSchemaData) => {

    try {
        const parsedData = registerSchema.safeParse(data);
        if (!parsedData.success) {
            return {
                success: false,
                message: "Validation Failed",
                errors: z.treeifyError(parsedData.error)
            }
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: parsedData.data.email
            }
        })
        if (existingUser) {
            return {
                success: false,
                message: "User already exists!"
            }
        }
        const hashedPass = await bcryptjs.hash(parsedData.data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: parsedData.data.username,
                email: parsedData.data.email,
                password: hashedPass,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        return {
            success: true,
            message: "Account Created Successfully",
            user
        }
        
    } catch (error) {
        console.log("error at registered ",error);
        return{
            success: false,
            message: "Something went wrong!"
        };
    }
}