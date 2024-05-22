import { analyzeSpam, generateRandomSpamMessage } from "@/lib/gemini/model";
import Form from "@/components/form";

export default function Page() {
  async function analyze(formData) {
    "use server";
    return await analyzeSpam(formData.get("text"));
  }

  async function getRandomSpamMessage(language = "English") {
    "use server";
    return await generateRandomSpamMessage(language);
  }

  return <Form analyze={analyze} getRandomSpamMessage={getRandomSpamMessage} />;
}
