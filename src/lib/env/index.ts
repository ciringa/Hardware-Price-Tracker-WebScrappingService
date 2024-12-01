import "dotenv/config"
import { z } from "zod"

export const {HOST,NODE_ENV,PORT} = z.object({
    NODE_ENV:z.enum(["dev","deploy"]).default("dev"),
    HOST:z.string(),
    PORT:z.string()
}).parse(process.env)