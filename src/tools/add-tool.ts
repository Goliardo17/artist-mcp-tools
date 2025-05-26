import { z } from "zod"
import { ToolDefinition } from "../types/indnex"

const addToolSchema = {
  a: z.number(),
  b: z.number(),
}

export const addTool: ToolDefinition<typeof addToolSchema> = {
  name: "add",
  description: "adding nums",
  schema: addToolSchema,
  execute: async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(a + b)
        }
      ]
    }
  }
}
