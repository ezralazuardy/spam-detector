import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ConfidenceRate from "@/components/confidence-rate";
import Disclaimer from "@/components/disclaimer";

export default function Result(props) {
  const resetForm = props?.resetForm;
  const show = props?.show ?? true;
  const result = props?.result ?? {};
  const category = result?.category ?? "Unknown";
  const confidence = result?.confidence ?? 0;
  const input = result?.input ?? "";
  const inputLanguage = result?.input_language ?? "English";
  const inputTranslation = result?.input_translation ?? "";
  const reason = result?.reason ?? "";
  const suggestion = result?.suggestion ?? "";

  return (
    <>
      <div
        className={`flex w-screen min-h-screen items-center justify-center absolute py-12 bg-white ${show ? `visible` : `invisible`}`}
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 font-inter">
              Detection Result
            </h2>
            <p className="text-gray-600">
              Based on our analysis, your text content is categorized as{" "}
              <b>{category}</b>.
            </p>
          </div>
          <div>
            <ConfidenceRate percentage={confidence} />
          </div>
          {inputLanguage === "English" ? null : (
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 font-inter">
                Translation
              </h2>
              <p className="text-gray-600 text-sm">
                {inputTranslation === "" || inputTranslation === "N/A"
                  ? "No translation available."
                  : inputTranslation}
              </p>
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 font-inter">
              Reason
            </h2>
            <p className="text-gray-600 text-sm">
              {reason === "" || reason === "N/A"
                ? "No reason available."
                : reason}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 font-inter">
              Suggestion
            </h2>
            <p className="text-gray-600 text-sm">
              {suggestion === "" || suggestion === "N/A"
                ? "No suggestion available."
                : suggestion}
            </p>
          </div>
          <Disclaimer />
          <div>
            <DialogText text={input} />
            <Button className="w-full" onClick={resetForm}>
              Analyze Other Text
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function DialogText({ text }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mb-4" variant="outline">
          Show Original Text
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-white text-gray-900 p-6 rounded-md shadow-lg w-[600px] max-w-full">
        <DialogHeader>
          <DialogTitle>Original Text Content</DialogTitle>
          <DialogDescription className="pt-2">
            This is the original text before we modified it for analysis
            purposes.
          </DialogDescription>
          <div className="pt-2">
            <Textarea
              className="flex-1 bg-white text-gray-900 font-mono resize-none !ring-transparent"
              readOnly
              rows={10}
              value={text}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
