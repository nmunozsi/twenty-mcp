import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function main() {
  const url = process.argv[2] || "http://localhost:3001/mcp";
  const transport = new SSEClientTransport(new URL(url));
  
  const client = new Client(
    { name: "update-script", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );
  
  console.log("Connecting to", url, "...");
  await client.connect(transport);
  console.log("Connected!");

  console.log("Searching for Notion3...");
  const searchResult = await client.callTool({
    name: "search_companies",
    arguments: { query: "Notion3" }
  });
  
  let resultText = searchResult.content[0].text;
  console.log("Search Result Text:", resultText);
  let parsed = JSON.parse(resultText);

  if (Array.isArray(parsed) && parsed.length > 0) {
     const target = parsed.find(c => c.name === "Notion3") || parsed[0];
     console.log("Target company:", target.name, target.id);
     
     console.log("Updating name to Notion666...");
     const updateResult = await client.callTool({
       name: "update_company",
       arguments: { id: target.id, name: "Notion666" }
     });
     console.log("Update Result Text:", updateResult.content[0].text);
  } else {
     console.log("Company 'Notion3' not found in search results.");
  }
  
  process.exit(0);
}

main().catch(e => {
  console.error("Error:", e);
  process.exit(1);
});
