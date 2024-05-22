import { GoogleGenerativeAI } from "@google/generative-ai";
import "../env.js";

// get the configuration
export const configuration = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY ?? "",
);

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

// parse the response as JSON object
export async function parseAsJSONObject(response, requiredProperties) {
  try {
    response = JSON.parse(response);
  } catch (e) {
    throw new Error(
      `Failed to parse the response as JSON. ${e.toString()}. Response: ${JSON.stringify(response)}`,
    );
  }

  let missingProperties = [];

  requiredProperties.forEach((property) => {
    if (!response.hasOwnProperty(property)) {
      missingProperties.push(property);
    }
  });

  if (missingProperties.length > 0) {
    throw new Error(
      `The response doesn't have ${missingProperties.join(", ")} attribute. Response: ${JSON.stringify(response)}`,
    );
  }

  return response;
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
    Make sure the JSON is valid.
    Make sure there is no "\`\`\`json" or "\`\`\`" in the response you give.
  `;

  let response = await ask(prompt);

  return parseAsJSONObject(response, [
    "detection",
    "confidence",
    "category",
    "reason",
    "suggestion",
    "input",
  ]);
}

// generete a random person name
export async function generateRandomPersonName() {
  let prompt = `
    Help me generate a random person name.

    I want the result to be formatted as JSON.

    The JSON should contain the following attributes:

    1. first_name (string, the first name of the person)
    2. last_name (string, the last name of the person)

    Make sure the JSON you give ONLY start with "{" and end with "}".
    Make sure the JSON is valid.
    Make sure there is no "\`\`\`json" or "\`\`\`" in the response you give.
  `;

  let response = await ask(prompt);

  return parseAsJSONObject(response, ["first_name", "last_name"]);
}

// generate a random spam text
export async function generateRandomSpamMessage(language = "English") {
  const firstPersonName = await generateRandomPersonName();

  const secondPersonName = await generateRandomPersonName();

  let prompt = `
    Make a scenario that the second person want to send a message to the first person.

    The first person name is ${firstPersonName.first_name}.

    The second person name is ${secondPersonName.first_name}.

    Make sure that the message is containing spam, malicious, or harmful content/activity.

    If you need to add example link, just randomize it.

    Make sure the message if safe enough to be displayed here.

    I just need the message text.

    Make sure the message is in ${language} language.

    I want the result to be formatted as JSON.

    The JSON should contain the following attributes:

    1. message (string, the message that contains spam, malicious, or harmful content/activity)

    Make sure the JSON you give ONLY start with "{" and end with "}".
    Make sure the JSON is valid.
    Make sure there is no "\`\`\`json" or "\`\`\`" in the response you give.
  `;

  let response = await ask(prompt);

  return parseAsJSONObject(response, ["message"]);
}
