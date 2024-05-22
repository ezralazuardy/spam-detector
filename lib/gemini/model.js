import { GoogleGenerativeAI } from "@google/generative-ai";
import "../env.js";

// get the configuration
export const configuration = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY ?? "",
);

// get the model
// @see https://ai.google.dev/gemini-api/docs/models/gemini
export const model = configuration.getGenerativeModel({
  model: "gemini-1.0-pro-001", // gemini-pro or gemini-1.5-pro-latest
});

// ask the model with a prompt
export async function ask(prompt) {
  const result = await model.generateContent(prompt.trim());
  return result.response.text();
}

// parse the response as JSON object
export async function parseAsJSONObject(response, requiredProperties) {
  response = response.replace("```json", "").replace("```", "");
  response = response.replace("\\n", "");
  response = response.trim();

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
    Help me identify a Text Content below to check if it's containing spam, malicious, or harmful content/activity based on the sentiment and keywords.

    Translate the Text Content to English!

    Remove any unnecessary whitespaces from Text Content!

    I want the result to be formatted as JSON data.

    The JSON should contain the following attributes:

    1. detection (boolean, set to true if you sure the Text Content is containing containing spam, malicious, or harmful content/activity)
    2. confidence (integer, how much the Text Content harmful rate, in percentage value, 0-100, more value means more harmful content/activity)
    3. category (string, the Text Content category, e.g., Promotional)
    4. reason (string, the reason you give such answer in English language)
    5. suggestion (string, the suggestion you give so that the Text Content don't marked as spam in English language)
    6. input (string, the original Text Content that you use to analyze)
    7. input_language (string, the language of the original Text Content, example: English)
    8. input_translation (string, the English translation of the original Text Content)

    -- Start of Text Content --
    ${text.trim()}
    -- End of Text Content --

    Make sure the JSON data is raw and a valid JSON object!
    Make sure the JSON data is wrapped in "\`\`\`json" and "\`\`\`" template!
    Make sure the JSON data is NOT formatted as string!
  `;

  let response = await ask(prompt);

  return parseAsJSONObject(response, [
    "detection",
    "confidence",
    "category",
    "reason",
    "suggestion",
    "input",
    "input_language",
    "input_translation",
  ]);
}

// generete a random person data
export async function generateRandomPersonData(language = "English") {
  let prompt = `
    Help me generate a random person data that usually speaks ${language}.

    I just need the first name of the person.
  `;

  let response = await ask(prompt);

  return {
    first_name: response.trim(),
  };
}

// generate a random spam text
export async function generateRandomSpamMessage(language = "English") {
  const maxCharacters = parseInt(
    process.env.NEXT_PUBLIC_MAXIMUM_CHARACTER ?? 1000,
  );

  const firstPerson = await generateRandomPersonData(language);

  const secondPerson = await generateRandomPersonData(language);

  let prompt = `
    Make a scenario that the second person want to send a message to the first person via email and considered as spam message.

    The first person name is ${firstPerson.first_name}.

    The second person name is ${secondPerson.first_name}.

    Make sure the message containing 500 - ${maxCharacters} characters!

    Make sure the message is in ${language} language!

    I just need the message text.

    You may add malicious or harmful content/activity to the message, but make sure it is safe enough to be displayed!!!

    Make sure that the message CAN BE CONSIDERED as SPAM!!!
  `;

  let response = await ask(prompt);

  return {
    message: response.trim(),
  };
}
