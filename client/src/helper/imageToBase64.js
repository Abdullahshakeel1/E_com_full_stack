export const imageToBase64 = async (image) => {
    const reader = new FileReader(); // Use 'new' to instantiate FileReader
    reader.readAsDataURL(image);
    const data = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return data;
  };
  