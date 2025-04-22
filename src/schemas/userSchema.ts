import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(1, { message: 'Name must be at least 1 character' }).optional(),
  image: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }).optional(),
  address: z.string().min(1, { message: 'Address must be at least 1 character' }).optional(),
  nrc: z.string().min(1, { message: 'NRC must be at least 1 character' }).optional(),
  gender: z.enum(['male', 'female', 'other'], { message: 'Gender must be male, female, or other' }).optional(),
  birthDate: z.string().datetime({ message: 'Birth date must be a valid ISO date' }).optional().transform(val => val ? new Date(val) : undefined),
  role: z.enum(['admin', 'manager', 'supporter'], { message: 'Role must be admin, manager or supporter' }).optional(),
  isActive: z.boolean({ message: 'isActive must be a boolean' }).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional(),
  name: z.string().min(1, { message: 'Name must be at least 1 character' }).optional(),
  image: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  phone: z.string().min(7, { message: 'Phone must be at least 7 characters' }).optional(),
  address: z.string().min(1, { message: 'Address must be at least 1 character' }).optional(),
  nrc: z.string().min(1, { message: 'NRC must be at least 1 character' }).optional(),
  gender: z.enum(['male', 'female', 'other'], { message: 'Gender must be male, female, or other' }).optional(),
  birthDate: z.string().datetime({ message: 'Birth date must be a valid ISO date' }).optional().transform(val => val ? new Date(val) : undefined),
  role: z.enum(['admin', 'supporter'], { message: 'Role must be admin or supporter' }).optional(),
  isActive: z.boolean({ message: 'isActive must be a boolean' }).optional(),
});

// Infer types for use in UserService
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;