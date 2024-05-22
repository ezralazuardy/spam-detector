import { ask } from "@ezralazuardy/gem";
import "@/lib/env.js";

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
    Help me generate a SINGLE random person data that usually speaks ${language}.
    I just need the first name of the person.
  `;

  let response = await ask(prompt);

  return {
    first_name: response.trim(),
  };
}

// generate a random spam text
export async function generateRandomSpamMessage(language = "English") {
  const maxWords = 80;

  const firstPerson = await generateRandomPersonData(language);

  const secondPerson = await generateRandomPersonData(language);

  let prompt = `
    Help me generate a message for a software testing purposes.

    Make a scenario that the ${firstPerson.first_name} want to send a message to the ${secondPerson.first_name} via email and the message is considered as a spam.

    You may add malicious or harmful content/activity to the message.

    Make sure to not use more than ${maxWords} words and the message is in ${language} language!!!

    I just need the message text.

    MAKE SURE THAT THE MESSAGE CAN BE CONSIDERED AS SPAM AND THE MESSAGE IS SAFE ENOUGH TO BE DISPLAYED!!!
  `;

  // add retry logic to avoid the SAFETY block
  // max retry is 5 times
  let retry = 1;
  while (true) {
    try {
      let response = await ask(prompt);
      return {
        message: response.trim(),
      };
    } catch (e) {
      if (retry >= 5) throw e;
      if (e?.message?.includes("Candidate was blocked due to SAFETY")) {
        retry++;
        continue;
      }
    }
  }
}
