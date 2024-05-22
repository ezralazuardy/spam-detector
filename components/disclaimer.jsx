import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Disclaimer() {
  return (
    <p className="text-gray-500 text-xs font-mono">
      The result may display inaccurate information, so please double-check. If
      you have any questions, please{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href="mailto:ezra@lazuardy.tech"
            className="font-bold hover:underline"
          >
            contact me
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/24422019" />
              <AvatarFallback>EL</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@ezralazuardy</h4>
              <p className="text-sm">
                I help companies through technology and design.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      .
    </p>
  );
}
