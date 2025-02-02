//@ts-ignore
import { GeminiAI } from "@arakoodev/edgechains.js/ai";

export default async function analyzeCode({
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
    const response = await openai.chat({ prompt, model: "gemini-1.5-flash" });
    const result = response.candidates[0].content.parts[0].text.toString();
    return result;
  } catch (e) {
    console.log("Error in analyzeCode");
    console.log(e);
    return { success: false, error: e };
  }
}
