import { GoogleGenerativeAI } from "@google/generative-ai";
import "../env.js";

// get the configuration
export const configuration = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// get the model
// @see https://ai.google.dev/gemini-api/docs/models/gemini
export const model = configuration.getGenerativeModel({
  model: "gemini-pro",
});

// ask the model with a prompt
export async function ask(prompt) {
  const result = await model.generateContent(prompt.trim());

  return result.response.text();
}

// analyze spam based on the given text content
export async function analyzeSpam(text) {
  let prompt = `
    Help me identify a Text Content below to check if it's containing spam, malicious, or harmful content/activity.

    Make sure to translate the Text Content to English before analyzing it.

    Make sure to remove any unnecessary whitespaces from Text Content.

    I want the result to be formatted as JSON.

    The JSON should contain the following attributes:

    1. detection (boolean, set to true if you sure the Text Content is containing containing spam, malicious, or harmful content/activity)
    2. confidence (integer, how much you confident with your answer, in percentage value, 0-100)
    3. category (string, the Text Content category, e.g., Promotional)
    4. reason (string, the reason you give such answer in English language)
    5. suggestion (string, the suggestion you give so that the Text Content don't marked as spam in English language)
    6. input (string, the original Text Content that you use to analyze)

    -- Start of Text Content --

    ${text.trim()}

    -- End of Text Content --

    Make sure the JSON you give ONLY start with "{" and end with "}".
  `;

  let response = await ask(prompt);

  try {
    response = JSON.parse(response);

    if (!response.hasOwnProperty("detection"))
      throw new Error("The response doesn't have 'detection' attribute");

    if (!response.hasOwnProperty("confidence"))
      throw new Error("The response doesn't have 'accuracy' attribute");

    if (!response.hasOwnProperty("category"))
      throw new Error("The response doesn't have 'category' attribute");

    if (!response.hasOwnProperty("reason"))
      throw new Error("The response doesn't have 'reason' attribute");

    if (!response.hasOwnProperty("suggestion"))
      throw new Error(
        `The response doesn't have 'suggestion' attribute. Response: ${JSON.stringify(response)}`,
      );
  } catch (e) {
    throw new Error(
      `Failed to parse the response as JSON. Response: ${JSON.stringify(response)}`,
    );
  }

  return response;
}
