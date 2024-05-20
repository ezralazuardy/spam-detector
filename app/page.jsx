"use client";

import { useState } from "react";
import Form from "@/components/form";
import Loader from "@/components/loader";
import Result from "@/components/result";

export default function Page() {
  const [formVisible, showForm] = useState(true);
  const [loadingVisible, showLoading] = useState(false);
  const [resultVisible, showResult] = useState(false);
  const [result, setResult] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    // set visibility
    showForm(false);
    showLoading(false);
    showResult(true);

    // process data
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const text = formData.get("text");
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
              Enter your text content to start analyzing it from spam,
              malicious, or violent content.
            </p>
          </div>
          <Form onSubmit={handleSubmit} />
        </div>
      </main>
      <Loader show={loadingVisible} />
      <Result show={resultVisible} result={result} />
    </>
  );
}
