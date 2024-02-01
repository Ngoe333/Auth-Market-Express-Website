import { truncateSync } from 'fs';
import * as z from 'zod';

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: 'Minimum 6 characrters required',
    }),

}); 



export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),

}); 



export const SettingsSchema = z.object({
    name: z.optional(z.string() || z.undefined()),
    email: z.optional(z.string().email()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    adresse: z.optional(z.string()),
    phoneNumber: z.optional(z.string()),
});




export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1,{
        message: 'Password is required',
    }),
    
    code: z.optional(z.string()),

}); 


export const RegisterSchema = z.object({

    name: z.string().min(3,{
        message: 'Name is required',
    }),

    email: z.string().email({
        message: 'Email is required',
    }),

    password: z.string().min(6,{
        message: 'Minimum 6 characters required',
    }),

    adresse: z.string().min(0,{
        message: 'Minimum 3 characters required',
    }),

    phoneNumber: z.string().min(8,{
        message: 'Minimum 18 numbers required',
    }),


});