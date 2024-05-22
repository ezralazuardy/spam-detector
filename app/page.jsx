import { analyzeSpam, generateRandomSpamMessage } from "@/lib/gemini/model";
import Form from "@/components/form";

export default function Page() {
  async function analyze(formData) {
    "use server";
    return await analyzeSpam(formData.get("text"));
  }

  async function getRandomSpamMessage() {
    "use server";
    return await generateRandomSpamMessage();
  }

  return <Form analyze={analyze} getRandomSpamMessage={getRandomSpamMessage} />;
}
