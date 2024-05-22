import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white absolute">
      <div className="items-center space-y-6">
        <div className="text-gray-500">
          <code>404 Not Found</code>
        </div>
        <div className="text-gray-900">
          <code>The thing you looking for is not here.</code>
        </div>
        <div className="text-gray-900 flex justify-end">
          <Link href="/" reload>
            <Button size="sm" variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
