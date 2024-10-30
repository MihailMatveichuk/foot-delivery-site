import { z } from 'zod';

export const RegisterFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+?[0-9]{10,13}$/,
      'Phone number must be between 10 and 13 digits, including an optional "+" symbol at the beginning'
    ),
  address: z.string().optional(),
});

export type IRegisterForm = z.infer<typeof RegisterFormSchema>;
