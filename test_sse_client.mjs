import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function main() {
  const url = process.argv[2] || "http://localhost:3000/mcp?apiKey=test&baseUrl=test";
  const transport = new SSEClientTransport(new URL(url));
  
  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );
  
  console.log("Connecting...");
  await client.connect(transport);
  
  console.log("Connected! Requesting tools...");
  const tools = await client.listTools();
  console.log("Tools:", tools);
  
  process.exit(0);
}

main().catch(console.error);
