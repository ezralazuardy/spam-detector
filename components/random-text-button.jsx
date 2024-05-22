import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";

export default function RandomTextButton({
  handleGenerateRandomSpamMessage,
  loadingRandomSpamMessageVisible,
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          className="w-full mb-4 !ring-transparent"
          variant="outline"
          disabled={loadingRandomSpamMessageVisible}
          onClick={() => handleGenerateRandomSpamMessage("English")}
        >
          {loadingRandomSpamMessageVisible
            ? `Generating Random Text...`
            : `Generate Random Text`}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => handleGenerateRandomSpamMessage("English")}
        >
          in 🇺🇸 English
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleGenerateRandomSpamMessage("Indonesia")}
        >
          in 🇮🇩 Bahasa Indonesia
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleGenerateRandomSpamMessage("Japanese")}
        >
          in 🇯🇵 Japanese
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => handleGenerateRandomSpamMessage("Korean")}
        >
          in 🇰🇷 Korean
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
