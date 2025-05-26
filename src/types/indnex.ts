import { ZodRawShape } from "zod";
import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface ToolDefinition<Args extends ZodRawShape> {
  name: string;
  description: string;
  schema: Args;
  execute: ToolCallback<Args>;
}
