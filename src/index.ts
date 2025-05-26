import dotenv from "dotenv";
import express from 'express';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { tools } from "./tools"

dotenv.config();

const app = express();
const port = 3001;

const server = new McpServer({
  name: 'artist-mcp-server',
  version: '1.0.0',
});

server.tool(
  tools.add.name,
  tools.add.description,
  tools.add.schema,
  tools.add.execute,
);

app.get("/sse", async (req, res) => {
  try {
    const transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
    app.locals.transport = transport;
  } catch (error) {
    console.error("SSE connection error:", error);
    res.status(500).end();
  }
});

app.post("/messages", async (req, res) => {
  try {
    const transport = app.locals.transport;
    if (!transport) {
      throw new Error("Transport not initialized");
    }
    await transport.handlePostMessage(req, res);
  } catch (error) {
    console.error("Message handling error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tools/list", async (req, res) => {
  try {

  } catch (error) {
    console.error("SSE connection error:", error);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`MCP-server has been started on http://localhost:${port}`);
});
