"use client";

import { useState } from "react";
import Error from "@/components/error";
import Loader from "@/components/loader";
import Result from "@/components/result";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Form(props) {
  const analyze = props?.analyze;
  const [errorVisible, showError] = useState(false);
  const [formVisible, showForm] = useState(true);
  const [loadingVisible, showLoading] = useState(false);
  const [resultVisible, showResult] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    showLoading(true);
    setTimeout(async () => {
      showError(false);
      showForm(false);
      showResult(false);
    }, 1000);

    try {
      const response = await analyze(new FormData(event.target));
      setResult(response);
    } catch (e) {
      showError(true);
      setTimeout(() => {
        showLoading(false);
        showForm(false);
        showResult(false);
      }, 1000);

      return;
    }

    showResult(true);
    setTimeout(() => {
      showError(false);
      showForm(false);
      showLoading(false);
    }, 1000);
  }

  async function resetForm() {
    showResult(false);
    showForm(true);
    setTimeout(() => {
      showError(false);
      showLoading(false);
      setResult(null);
    }, 1000);
  }

  return (
    <>
      <main
        className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 ${formVisible ? `visible` : `invisible`}`}
      >
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 font-inter">
              Analyze Your Text
            </h2>
            <p className="text-gray-600 font-inter">
              We use Artificial Intelligence to analyze a text content from
              spam, malicious, or violent content.
            </p>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div class="pb-10">
              <label
                className="mb-2 block text-gray-700 font-medium font-inter"
                htmlFor="text"
              >
                Text Content
              </label>
              <Textarea
                className="w-full min-h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                id="text"
                type="text"
                name="text"
                placeholder="Enter the text content that you want to analyze"
                maxLength={1000}
                rows={5}
                required={true}
                value="Hi Ezra, I accidentally locked myself out of my computer and all my files are encrypted! Please send me some money via PayPal so I can fix it. Thanks, Leon."
              />
              <p className="text-gray-500 text-sm mt-1 font-inter">
                Maximum 1000 characters. We will remove any unnecessary
                whitespaces. We support any kind of languages.
              </p>
            </div>
            <Button className="w-full" type="submit">
              Analyze
            </Button>
            <div>
              <p className="text-gray-500 text-xs mt-1 font-inter">
                The result may display inaccurate information, so please
                double-check.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Loader show={loadingVisible} />
      <Error show={errorVisible} resetForm={resetForm} />
      <Result show={resultVisible} resetForm={resetForm} result={result} />
    </>
  );
}
