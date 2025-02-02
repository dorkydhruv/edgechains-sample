//@ts-ignore
import { GeminiAI } from "@arakoodev/edgechains.js/ai";

async function analyzeCode({
  prompt,
  apiKey,
}: {
  prompt: string;
  apiKey: string;
}) {
  try {
    console.log("Working fine in analyzeCode");
    const openai = new GeminiAI({
      apiKey,
    });
    // const response = await openai.chat({ prompt, model: "gemini-1.5-flash" });
    // const result = response.candidates[0].content.parts[0].text.toString();
    // return JSON.stringify({ success: true, result });
    return JSON.stringify({ success: true, result: "This is a test response" });
  } catch (e) {
    console.log("Error in analyzeCode");
    console.log(e);
    return JSON.stringify({ success: false, error: e });
  }
}

module.exports = analyzeCode;
