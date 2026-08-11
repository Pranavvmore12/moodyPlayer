const ImageKit = require("imagekit");
const mongoose = require("mongoose");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file) => {
  try {
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: new mongoose.Types.ObjectId().toString(), // Generate a unique filename using ObjectId
      folder: "moodyPlayerAudio"
    });

    return result;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw error;
  }
};

module.exports = {
  uploadFile,
};
