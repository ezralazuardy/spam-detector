import { analyzeSpam } from "@/lib/gemini/model";
import Form from "@/components/form";

export default function Page() {
  async function analyze(formData) {
    "use server";
    return await analyzeSpam(formData.get("text"));
  }

  return <Form analyze={analyze} />;
}
