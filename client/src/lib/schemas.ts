import z from "zod";

export const BoardGameSchema = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().url(),
})

export const PlayerSchema = z.object({
  name: z.string(),
  email: z.string(),
})

export const schemaMap: Record<string, z.ZodObject<z.ZodRawShape>> = {
  boardgame: BoardGameSchema,
  player: PlayerSchema
}