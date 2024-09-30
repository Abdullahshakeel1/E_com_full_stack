const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDNARY}/image/upload`;

const UploadImages = async (image) => {
    if (!process.env.REACT_APP_CLOUD_NAME_CLOUDNARY || !process.env.REACT_APP_CLOUDINARY_PRESET_NAME) {
        throw new Error('Cloudinary environment variables are not set properly.');
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME);

    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('UploadImages Error:', error);
        throw error;
    }
};

export default UploadImages;
