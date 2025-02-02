//@ts-ignore
import { ArakooServer } from "@arakoodev/edgechains.js/arakooserver";
//@ts-ignore
import Jsonnet from "@arakoodev/jsonnet";
//@ts-ignore
import createClient from "@arakoodev/edgechains.js/sync-rpc";
import fileURLToPath from "file-uri-to-path";
import path from "path";
import analyzeCode from "./lib/analyzeCodeGemini.js";
const jsonnet = new Jsonnet();

const __dirname = fileURLToPath(import.meta.url);
const secretsPath = path.join(__dirname, "../../jsonnet/secrets.jsonnet");
const geminiKey = JSON.parse(jsonnet.evaluateFile(secretsPath)).gemini_key;

// const analyzeCode = createClient.createSyncRPC(
//   path.join(__dirname, "../lib/analyzeCode.cjs")
// );

const server = new ArakooServer();
server.useCors("*");
const app = server.createApp();
app.get("/", (c: any) => {
  return c.text(geminiKey);
});

app.post("/review", async (c: any) => {
  const { language, code } = await c.req.json();
  jsonnet.extString("language", language);
  jsonnet.extString("code", code);
  jsonnet.extString("gemini_key", geminiKey);
  // jsonnet.javascriptCallback("analyze", analyzeCode);
  const evaluated = JSON.parse(
    jsonnet.evaluateFile(path.join(__dirname, "../../jsonnet/main.jsonnet"))
  );
  const result = await analyzeCode({
    apiKey: geminiKey,
    prompt: evaluated.prompt,
  });
  return c.json(result);
});

server.listen(3000);
