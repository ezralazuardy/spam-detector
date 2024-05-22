import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";

const languages = [
  {
    name: "English",
    label: "🇺🇸 English",
  },
  {
    name: "Indonesian",
    label: "🇮🇩 Bahasa Indonesia",
  },
  {
    name: "Japanese",
    label: "🇯🇵 Japanese",
  },
  {
    name: "Korean",
    label: "🇰🇷 Korean",
  },
  {
    name: "Russian",
    label: "🇷🇺 Russian",
  },
];

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
      <ContextMenuContent className="dark:text-gray-700 dark:bg-white dark:border-0">
        {languages.map((language) => (
          <ContextMenuItem
            key={language.name}
            className="dark:focus:text-gray-700 dark:focus:bg-gray-200"
            onClick={() => handleGenerateRandomSpamMessage(language.name)}
          >
            in {language.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
