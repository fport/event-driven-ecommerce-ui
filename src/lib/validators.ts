import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().positive("Price must be positive"),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerEmail: z.email("Invalid email address"),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

export const productSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  price: z.number().positive("Price must be positive"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const stockAdjustSchema = z.object({
  stockChange: z.number().int("Stock change must be a whole number"),
});

export type StockAdjustFormValues = z.infer<typeof stockAdjustSchema>;
