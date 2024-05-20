import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Form(props) {
  const handleSubmit = props?.onSubmit;

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block text-gray-700 font-medium font-inter"
            htmlFor="email"
          >
            Email Sender (optional)
          </label>
          <Input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
            id="email"
            type="email"
            name="email"
            placeholder="Enter the email address from the sender"
            required={true}
            value="ezralazuardy@icloud.com"
          />
          <p className="text-gray-500 text-sm mt-1 font-inter">
            Fill this field if you&apos;re analyzing an email. It can help us to
            provide better analysis.
          </p>
        </div>
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
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <p className="text-gray-500 text-sm mt-1 font-inter">
            Maximum 1000 characters. We will remove any unnecessary whitespaces.
          </p>
        </div>
        <Button className="w-full" type="submit">
          Analyze
        </Button>
      </form>
    </>
  );
}
