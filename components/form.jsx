"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Error from "@/components/error";
import Loader from "@/components/loader";
import Result from "@/components/result";
import Disclaimer from "@/components/disclaimer";
import RandomTextButton from "@/components/random-text-button";

export default function Form(props) {
  const maxCharacters = parseInt(
    process.env.NEXT_PUBLIC_MAXIMUM_CHARACTER ?? 5000,
  );
  const analyze = props?.analyze;
  const [errorVisible, showError] = useState(false);
  const [formVisible, showForm] = useState(true);
  const [loadingVisible, showLoading] = useState(false);
  const [resultVisible, showResult] = useState(false);
  const [result, setResult] = useState(null);

  const getRandomSpamMessage = props?.getRandomSpamMessage;
  const [loadingRandomSpamMessageVisible, showLoadingRandomSpamMessageVisible] =
    useState(false);
  const [textContent, setTextContent] = useState(
    "Hi Ezra, I accidentally locked myself out of my computer and all my files are encrypted! Please send me some money via PayPal, so I can fix it. Thanks, Leon.",
  );

  async function handleSubmit(event) {
    event.preventDefault();

    showLoading(true);

    try {
      const response = await analyze(new FormData(event.target));
      setResult(response);
    } catch (e) {
      console.error(e);

      if (e?.message?.includes("429 Too Many Requests")) {
        toast.error("Too many request! Please try again later.");
        setTimeout(() => {
          showForm(true);
          showLoading(false);
          showResult(false);
          showError(false);
        }, 1000);
        return;
      }

      showLoading(false);
      showError(true);
      setTimeout(() => {
        showForm(false);
        showResult(false);
      }, 600);
      return;
    }

    showResult(true);
    setTimeout(() => {
      showLoading(false);
      showError(false);
      showForm(false);
    }, 600);
  }

  async function handleGenerateRandomSpamMessage(language = "English") {
    toast.promise(
      async () => {
        try {
          showLoadingRandomSpamMessageVisible(true);
          const response = await getRandomSpamMessage(language);
          setTextContent(response.message);
        } catch (e) {
          throw e;
        }
      },
      {
        loading: "Asking AI to generate a random text...",
        success: () => {
          showLoadingRandomSpamMessageVisible(false);
          return "Random text successfully generated.";
        },
        error: (e) => {
          console.error(e);
          showLoadingRandomSpamMessageVisible(false);
          if (e.message.includes("429 Too Many Requests")) {
            return "Too many request! Please try again later.";
          }
          return "Error has happened. Please try again.";
        },
      },
    );
  }

  async function handleTextContentChange(event) {
    setTextContent(event.target.value);
  }

  async function resetForm() {
    showResult(false);
    showForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      showError(false);
      showLoading(false);
      setResult(null);
    }, 600);
  }

  return (
    <>
      <div
        className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 ${formVisible ? `visible` : `invisible`}`}
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 font-inter">
              Analyze Your Text
            </h2>
            <p className="text-gray-600 font-inter">
              We use Artificial Intelligence to analyze a text from spam,
              malicious, or violent content based on sentiment and keywords.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="pb-10">
              <label
                className="mb-2 block text-gray-800 font-bold text-md font-inter"
                htmlFor="text"
              >
                Text Content
              </label>
              <Textarea
                className="w-full min-h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                placeholder="Enter the text content that you want to analyze"
                value={textContent}
                onChange={handleTextContentChange}
                id="text"
                type="text"
                name="text"
                maxLength={maxCharacters}
                rows={10}
                required
              />
              <p className="text-gray-500 text-xs mt-2">
                Maximum {maxCharacters} characters. We will remove any
                unnecessary whitespaces. We support any kind of languages.
              </p>
            </div>
            <div>
              <RandomTextButton
                className="w-full mb-4"
                handleGenerateRandomSpamMessage={
                  handleGenerateRandomSpamMessage
                }
                loadingRandomSpamMessageVisible={
                  loadingRandomSpamMessageVisible
                }
              />
              <Button className="w-full mb-4" type="submit">
                Analyze
              </Button>
              <Disclaimer />
            </div>
          </form>
        </div>
      </div>
      <Loader show={loadingVisible} />
      <Error show={errorVisible} resetForm={resetForm} />
      <Result show={resultVisible} resetForm={resetForm} result={result} />
    </>
  );
}
