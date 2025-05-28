"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  ArrowUp,
  Camera,
  ImagePlusIcon,
  LoaderPinwheelIcon,
  // LoaderPinwheelIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTradeplan } from "@/hooks/useTradePlan";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { tradePlan, isUploading, error, uploadImage } = useTradeplan();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileSelect triggered"); // Add this
    const file = event.target.files?.[0];
    console.log("File found:", file); // Add this
    if (file) {
      console.log("About to process file"); // Add this
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    console.log("processFile called with:", file.name, file.type); // Add this
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
  };

  // const analyseChart = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     setIsuploading(true);

  //     const response = await fetch("/api/analyse-chart", {
  //       method: "POST",
  //       body: formData, // No Content-Type header needed
  //     });
  //     if (response) {
  //       setIsuploading(false);
  //       return response.json();
  //     } else {
  //       setIsuploading(false);
  //       const errorMessage = "Issue with openAI response";
  //       console.log(`Problem uploading image: ${errorMessage}`);
  //       throw Error(errorMessage);
  //     }
  //   } catch (error) {
  //     const errorMessage = error as string;

  //     console.log(`Problem uploading image: ${errorMessage}`);
  //     toast.error(`Problem uploading image: ${errorMessage}`);
  //     setIsuploading(false);
  //   }
  // };

  const handleSelectAction = async () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const HandleAnalyseAction = async () => {
    if (selectedFile) {
      await uploadImage(selectedFile);
    }
  };

  useEffect(() => {
    if (tradePlan) {
      // GO TO TRADEPLAN ID
      router.push(`trades/${tradePlan.analysis.id}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [tradePlan, error, router]);

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <Image src="/logo-systemly.svg" alt="Logo" width={150} height={200} />
        <Card className="px-8 py-4 max-w-2xl">
          <div>
            <h2 className="font-bold text-2xl">Upload a chart image</h2>
            <p className="text-sm text-gray-500">
              Upload a chart image to get started. We will extract the data from
              the image and provide you with insights.
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mt-4">
            {previewUrl ? (
              <div className="relative">
                <div className="relative w-full max-h-64 overflow-hidden rounded-lg">
                  {isUploading && (
                    <div className="absolute bg-black/70  overflow-hidden w-full h-full flex flex-col rounded-lg justify-center items-center gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <LoaderPinwheelIcon
                          className="text-white animate-spin"
                          size={18}
                        />
                        <p className="text-gwhite">Uploading...</p>
                      </div>

                      {/* <div className="w-full px-8">
                        <Card className="progress-update flex flex-row gap-3 items-center p-4 bg-">
                          <CheckCircle2Icon
                            className="text-green-500 animate-collapsible-up"
                            size={18}
                          />
                          <p className="text-gwhite">Uploading image</p>
                        </Card>
                      </div> */}
                    </div>
                  )}
                  <Image
                    src={previewUrl}
                    alt="Upload"
                    width={400}
                    height={200}
                    className="object-cover bg-gray-900 rounded-lg w-full max-h-64"
                  />
                </div>

                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center h-64 border-dashed border-4 rounded-lg gap-4 cursor-pointer transition-colors`}
                onClick={handleSelectAction}
              >
                <ImagePlusIcon className={"text-gray-500"} size={64} />

                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAction();
                  }}
                >
                  Upload Image
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-4  w-full">
            <div className="border rounded-lg px-4 py-2 flex flex-row justify-center items-center text-sm flex-1">
              {selectedFile ? (
                <p className="flex flex-row gap-2 items-center">
                  {selectedFile.name}{" "}
                  <Camera className="text-gray-500" size={16} />
                </p>
              ) : (
                <p>Select an image to analyse</p>
              )}
            </div>
            <Button disabled={!selectedFile} onClick={HandleAnalyseAction}>
              Analyse <ArrowUp className="text-gray-500" size={32} />
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
