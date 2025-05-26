// // lib/trading/process-chart-image.ts
// import { promises } from "fs";
// // import fs from "fs";
// import path from "path";

// // Types
// interface ImageValidation {
//   isValid: boolean;
//   error?: string;
// }

// interface ProcessingResult {
//   success: boolean;
//   base64?: string;
//   error?: string;
//   metadata?: {
//     originalSize?: number;
//     processedSize?: number;
//     width?: number;
//     height?: number;
//     format: string;
//   };
// }

// interface ImageMetadata {
//   width?: number;
//   height?: number;
//   format: string;
//   size: number;
// }

// // Constants
// export const SUPPORTED_FORMATS = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
//   "image/gif",
// ];
// export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// export const MAX_DIMENSIONS = { width: 2048, height: 2048 };

// // Sample chart URLs for testing
// export const SAMPLE_CHART_URLS = [
//   "https://www.tradingview.com/x/example-chart-1/", // Replace with actual chart images
//   "https://example.com/eurusd-chart.png",
//   "https://example.com/gold-chart.jpg",
// ];

// // Test base64 image (1x1 pixel for testing)
// export const TEST_CHART_BASE64 =
//   "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

// /**
//  * Convert URL image to base64 (for server-side use)
//  */
// // export async function urlToBase64(imageUrl: string): Promise<string> {
// //   try {
// //     console.log(`Fetching image from URL: ${imageUrl}`);

// //     const response = await fetch(imageUrl, {
// //       headers: {
// //         "User-Agent":
// //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
// //       },
// //     });

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
// //     }

// //     const contentType = response.headers.get("content-type");
// //     if (!contentType?.startsWith("image/")) {
// //       throw new Error(`Invalid content type: ${contentType}`);
// //     }

// //     const arrayBuffer = await response.arrayBuffer();
// //     const buffer = Buffer.from(arrayBuffer);

// //     console.log(`Successfully converted URL image: ${buffer.length} bytes`);
// //     return buffer.toString("base64");
// //   } catch (error) {
// //     console.error("Failed to convert URL to base64:", error);
// //     throw new Error(
// //       `Image conversion failed: ${
// //         error instanceof Error ? error.message : "Unknown error"
// //       }`
// //     );
// //   }
// // }

// /**
//  * Convert local file to base64 (Node.js server-side)
//  */
// export async function fileToBase64(filePath: string): Promise<string> {
//   try {
//     console.log(`Reading file: ${filePath}`);

//     // Check if file exists
//     const stats = await promises.stat(filePath);
//     if (!stats.isFile()) {
//       throw new Error("Path is not a file");
//     }

//     // Validate file size
//     if (stats.size > MAX_FILE_SIZE) {
//       throw new Error(
//         `File too large: ${(stats.size / 1024 / 1024).toFixed(1)}MB (max: ${
//           MAX_FILE_SIZE / 1024 / 1024
//         }MB)`
//       );
//     }

//     // Validate file extension
//     const ext = path.extname(filePath).toLowerCase();
//     const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
//     if (!validExtensions.includes(ext)) {
//       throw new Error(
//         `Invalid file extension: ${ext}. Allowed: ${validExtensions.join(", ")}`
//       );
//     }

//     const fileBuffer = await promises.readFile(filePath);

//     console.log(`Successfully read file: ${fileBuffer.length} bytes`);
//     return fileBuffer.toString("base64");
//   } catch (error) {
//     console.error("Failed to read file:", error);
//     throw new Error(
//       `File reading failed: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`
//     );
//   }
// }

// /**
//  * Convert File object to base64 (for browser/API routes)
//  */
// export async function fileObjectToBase64(
//   file: File
// ): Promise<ProcessingResult> {
//   try {
//     // Validate file
//     const validation = validateImageFile(file);
//     if (!validation.isValid) {
//       return {
//         success: false,
//         error: validation.error,
//       };
//     }

//     // Convert to ArrayBuffer then to base64
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const base64 = buffer.toString("base64");

//     console.log(
//       `Converted file object: ${file.name} (${file.type}) - ${buffer.length} bytes`
//     );

//     return {
//       success: true,
//       base64,
//       metadata: {
//         originalSize: file.size,
//         processedSize: buffer.length,
//         format: file.type,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to convert file object:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "File conversion failed",
//     };
//   }
// }

// /**
//  * Convert FormData image to base64
//  */
// export async function formDataToBase64(
//   formData: FormData,
//   fieldName: string = "image"
// ): Promise<ProcessingResult> {
//   try {
//     const file = formData.get(fieldName) as File;

//     if (!file || !(file instanceof File)) {
//       return {
//         success: false,
//         error: `No file found in FormData field: ${fieldName}`,
//       };
//     }

//     return await fileObjectToBase64(file);
//   } catch (error) {
//     console.error("Failed to process FormData:", error);
//     return {
//       success: false,
//       error:
//         error instanceof Error ? error.message : "FormData processing failed",
//     };
//   }
// }

// /**
//  * Clean base64 string (remove data URL prefix if present)
//  */
// export function cleanBase64String(base64String: string): string {
//   // Remove data URL prefix: "data:image/jpeg;base64,..."
//   return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
// }

// /**
//  * Validate image file
//  */
// export function validateImageFile(file: File): ImageValidation {
//   // Check file exists
//   if (!file) {
//     return { isValid: false, error: "No file provided" };
//   }

//   // Check file type
//   if (!SUPPORTED_FORMATS.includes(file.type)) {
//     return {
//       isValid: false,
//       error: `Unsupported format: ${
//         file.type
//       }. Allowed: ${SUPPORTED_FORMATS.join(", ")}`,
//     };
//   }

//   // Check file size
//   if (file.size > MAX_FILE_SIZE) {
//     return {
//       isValid: false,
//       error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max: ${
//         MAX_FILE_SIZE / 1024 / 1024
//       }MB`,
//     };
//   }

//   // Check minimum size
//   if (file.size < 100) {
//     return {
//       isValid: false,
//       error: "File too small (minimum 100 bytes)",
//     };
//   }

//   return { isValid: true };
// }

// /**
//  * Get image metadata from base64 (basic detection)
//  */
// export function getImageMetadata(base64: string): ImageMetadata {
//   const buffer = Buffer.from(base64, "base64");

//   // Basic format detection from first few bytes
//   let format = "unknown";
//   if (buffer[0] === 0xff && buffer[1] === 0xd8) {
//     format = "image/jpeg";
//   } else if (
//     buffer[0] === 0x89 &&
//     buffer[1] === 0x50 &&
//     buffer[2] === 0x4e &&
//     buffer[3] === 0x47
//   ) {
//     format = "image/png";
//   } else if (
//     buffer.toString("ascii", 0, 4) === "RIFF" &&
//     buffer.toString("ascii", 8, 12) === "WEBP"
//   ) {
//     format = "image/webp";
//   }

//   return {
//     format,
//     size: buffer.length,
//   };
// }

// /**
//  * Resize image if needed (returns base64)
//  * Note: This is a simplified version - for production, consider using sharp or similar
//  */
// export async function resizeImageIfNeeded(
//   base64: string,
//   maxWidth: number = 2048,
//   maxHeight: number = 2048
// ): Promise<string> {
//   // For server-side image processing, you'd typically use a library like 'sharp'
//   // This is a placeholder that returns the original base64
//   // In a real implementation, you'd:
//   // 1. Decode base64 to buffer
//   // 2. Use sharp to resize
//   // 3. Encode back to base64

//   console.log(
//     `Image resize requested (max: ${maxWidth}x${maxHeight}) - returning original for now`
//   );
//   return base64;
// }

// /**
//  * Main processing function - handles multiple input types
//  */
// export async function processChartImage(
//   input: File | FormData | string | null
// ): Promise<ProcessingResult> {
//   //   const imagePath = "path_to_your_image.jpg";
//   //   const base64Image = fs.readFileSync(imagePath, "base64");

//   try {
//     if (input instanceof File) {
//       // Handle File object
//       return await fileObjectToBase64(input);
//     } else if (input instanceof FormData) {
//       // Handle FormData
//       return await formDataToBase64(input);
//     } else if (typeof input === "string") {
//       if (input.startsWith("http://") || input.startsWith("https://")) {
//         // Handle URL
//         const base64 = await urlToBase64(input);
//         return {
//           success: true,
//           base64,
//           metadata: getImageMetadata(base64),
//         };
//       } else if (input.startsWith("/") || input.includes("\\")) {
//         // Handle file path
//         const base64 = await fileToBase64(input);
//         return {
//           success: true,
//           base64,
//           metadata: getImageMetadata(base64),
//         };
//       } else {
//         // Assume it's already base64
//         const cleanBase64 = cleanBase64String(input);
//         return {
//           success: true,
//           base64: cleanBase64,
//           metadata: getImageMetadata(cleanBase64),
//         };
//       }
//     }

//     return {
//       success: false,
//       error: "Unsupported input type",
//     };
//   } catch (error) {
//     console.error("Image processing failed:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Processing failed",
//     };
//   }
// }

// /**
//  * Utility: Get test image for development
//  */
// export function getTestImage(): string {
//   return TEST_CHART_BASE64;
// }

// /**
//  * Utility: Validate base64 string
//  */
// export function isValidBase64(str: string): boolean {
//   try {
//     return Buffer.from(str, "base64").toString("base64") === str;
//   } catch {
//     return false;
//   }
// }
