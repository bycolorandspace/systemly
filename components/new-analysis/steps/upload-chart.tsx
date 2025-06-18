"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  // ArrowUp,
  PlusCircle,
  // LoaderPinwheelIcon,
  X,
} from "lucide-react";
import {
  useEffect,
  //useEffect,
  useRef,
  useState,
} from "react";
// import { toast } from "sonner";
// import { useTradeplan } from "@/hooks/useTradePlan";
// import { useRouter } from "next/navigation";
// import TradeAnalysisLoading from "@/components/skeleton/trade-analysis-loading";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import {
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function SelectChartImage() {
  const form = useFormContext(); // React Hook Form
  const { selectedImage, selectImageFile, clearImageFile } =
    useTradeAnalysisContext();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onFormChange: (file: File) => void
  ) => {
    clearImageFile(); // Custom context
    const file = event.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update both systems
      await selectImageFile(file); // Custom context (for UI state)
      onFormChange(file); // React Hook Form (for validation)
      await form.trigger("image");
    }
  };

  const handleSelectAction = async () => {
    fileInputRef.current?.click();
  };

  const removeImage = (onFormChange: (value: undefined) => void) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Clear both systems
    clearImageFile(); // Custom context
    onFormChange(undefined); // React Hook Form
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.trigger("image");
  };

  useEffect(() => {
    if (selectedImage) {
      // Clean up previous URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create new preview URL from stored File
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);

      // Also update React Hook Form
      form.setValue("image", selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    // Cleanup function to revoke the object URL when the component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedImage]);

  //   useEffect(() => {
  //     if (tradePlan && !isLoading) {
  //       // GO TO TRADEPLAN ID
  //       router.push(`trades/${tradePlan.id}`);
  //     }
  //   }, [isLoading, router, tradePlan]);

  // Turn Trade/ID into loading view compoent, imprt whole compoent and display whilst loading

  return (
    <>
      <div className=" items-center w-full  justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col w-full gap-[32px] row-start-2 items-center justify-center">
          <FormField
            control={form.control}
            name={"image"}
            render={({ field }) => (
              <FormItem className="w-full max-w-4xl ">
                <FormControl>
                  {/* Your existing Card and upload UI here */}
                  <Card
                    className={`flex flex-col bg-transparent w-full  items-center justify-center p-8 rounded-lg gap-8 cursor-pointer transition-colors duration-200 hover:bg-card hover:border-secondary border border-border group`}
                    onClick={handleSelectAction}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileSelect(event, field.onChange)
                      }
                      className="hidden"
                    />

                    <div className="mt-4">
                      {previewUrl ? (
                        <div className="relative">
                          <div className="relative w-full p-8  overflow-hidden rounded-lg">
                            <Image
                              src={previewUrl}
                              alt="Upload"
                              width={400}
                              height={200}
                              className="object-cover bg-gray-900 rounded-lg w-full h-full"
                            />
                          </div>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(field.onChange);
                            }}
                            className="absolute w-8 h-8 top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                          >
                            <X size={8} />
                          </Button>
                        </div>
                      ) : (
                        <div className="max-w-md flex flex-col gap-6 justify-center items-center">
                          <PlusCircle
                            className={"text-border group-hover:text-white"}
                            size={48}
                            strokeWidth={0.75}
                          />
                          <h2 className="headerh2">Add a new chart</h2>
                          <p className="text-sm text-center text-secondary">
                            Add at least one chart screenshot. For a more
                            accurate trade plan & analysis, add a range of small
                            to high time frames charts (e.g 15 Min, 1hr, 4hr).
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </FormControl>
                <FormMessage /> {/* Zod validation errors appear here */}
              </FormItem>
            )}
          />
        </main>
      </div>
    </>
  );
}
