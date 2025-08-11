import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Ellipsis } from "lucide-react";

export default function AnalysisSummarisedOptions({
  analysisId,
  deleted,
}: {
  analysisId: string;
  deleted?: (analysisId: string) => void;
}) {
  // Use hook to deler
  const handleDeleteAnlysis = async () => {
    try {
      // Call the delete function with the analysis ID
      if (deleted) {
        // If a callback is provided, call it
        deleted(analysisId); // Notify parent component that analysis is deleted
      }
      console.log(`Analysis with ID ${analysisId} deleted.`);
    } catch (error) {
      console.error("Error deleting analysis:", error);
    }
  };

  //   useEffect(() => {
  //     if (success) {
  //       toast.success("Analysis deleted successfully.");
  //       console.log("Analysis deleted successfully.");
  //     }
  //     if (error) {
  //       toast.error(`Error deleting analysis: ${error}`);
  //       console.error("Error deleting analysis:", error);
  //     }
  //   }, [success, error]);

  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="flex items-center justify-center w-8 h-8  hover:bg-secondary/10 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        >
          <Ellipsis className="w-6 h-6 text-secondary" />
        </MenubarTrigger>
        <MenubarContent className="bg-card">
          <MenubarItem
            className="cursor-pointer text-secondary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteAnlysis();
            }}
          >
            Delete <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
