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
