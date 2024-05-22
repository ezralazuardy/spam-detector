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
import Link from "next/link";

export default function Result(props) {
  const resetForm = props?.resetForm;
  const show = props?.show ?? true;
  const result = props?.result ?? {};
  const category = result?.category ?? "Unknown";
  const confidence = result?.confidence ?? 0;
  const input = result?.input ?? "";
  const reason = result?.reason ?? "";
  const suggestion = result?.suggestion ?? "";

  return (
    <>
      <div
        className={`flex h-screen w-screen items-center justify-center bg-white absolute ${show ? `visible` : `invisible`}`}
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
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 font-inter">
              Reason
            </h2>
            <p className="text-gray-600 font-inter">
              {reason === "" ? "No reason available." : reason}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 font-inter">
              Suggestion
            </h2>
            <p className="text-gray-600 font-inter">
              {suggestion === "" ? "No suggestion available." : suggestion}
            </p>
          </div>
          <p className="text-gray-500 text-xs font-mono">
            The result above display inaccurate information, so please
            double-check. If you have any questions, please{" "}
            <Link href="mailto:ezra@lazuardy.tech" className="underline">
              contact me
            </Link>
            .
          </p>
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
        <div className="flex items-center space-x-2">
          <DialogHeader>
            <DialogTitle>Original Text Content</DialogTitle>
            <DialogDescription className="pt-2">
              This original text was automatically modified for analysis. We
              translated it to English and removed any unnecessary whitespaces.
            </DialogDescription>
            <div className="pt-4">
              <Textarea
                className="flex-1 bg-white text-gray-900 font-mono resize-none !ring-transparent"
                readOnly
                rows={8}
                value={text}
              />
            </div>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
