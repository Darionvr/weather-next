import { z } from "zod";

export const placeSchema = z.string().min(3, "El nombre del lugar debe tener al menos 3 caracteres");


