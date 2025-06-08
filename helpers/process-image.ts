export const processImageFile = (file: File) => {
  console.log("processFile called with:", file.name, file.type); // Add this
  if (!file.type.startsWith("image/")) {
    return {
      file: null,
      error: "Please select an image file",
    };
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      file: null,
      error: "File size must be less than 5MB",
    };
  }

  return {
    file: file,
    url: URL.createObjectURL(file),
  };
};
