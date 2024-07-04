import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title should be a string"
    })
    .min(2,{message: "Title must be more than 2 characters"})
    .max(200, {message: "Title should be less than 200 characters"}),
    description: z.string().min(10, "desciption must be more than 10 characters")
});

export const updateArticleSchema = z.object({
    title: z.string( {
        required_error: "Title is required",
        invalid_type_error: "Title should be a string"
    }).min(2,"Title must be more than 2 characters").max(200),
    description: z.string().min(10, "desciption must be more than 10 characters")
});



export const RegisterUserSchema = z.object({
    email: z.string().min(3).max(200).email("Invalid email address"), // .optional()
    password: z.string().min(6, "Password must be more than 6 characters"),
    username: z.string().min(2).max(100)
    
})


export const LoginUserSchema = z.object({
    email: z.string({required_error: "required"}).min(3).max(200).email("Invalid email address"),
    password: z.string().min(6, "Password must be more than 5 characters")
});

export const UpdateUserSchema = z.object({
    email: z.string().min(3).max(200).email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be more than 6 characters").optional(),
    username: z.string().min(2).max(100).optional()
    
})



export const CreateCommentSchema = z.object({
    text: z.string().min(2).max(500),
    articleId: z.number()
});