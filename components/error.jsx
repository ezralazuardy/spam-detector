import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error(props) {
  const show = props?.show ?? true;
  const resetForm = props?.resetForm;

  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-white absolute ${show ? `visible` : `invisible`}`}
    >
      <div className="items-center space-y-6">
        <div className="text-gray-500">
          <code>Error has happened :(</code>
        </div>
        <div className="text-gray-900">
          <code>I&apos;m not perfect, please give me another chance.</code>
        </div>
        <div className="text-gray-900 flex justify-end">
          <Link href="/" onClick={resetForm}>
            <Button size="sm" variant="outline">
              Retry
            </Button>
          </Link>
          <Link href="mailto:ezra@lazuardy.tech" className="ms-4">
            <Button size="sm" variant="default">
              Contact Developer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
