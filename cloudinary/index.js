const cloudinary = require("cloudinary");

const deleteMediaFromCloudinary = async (assetId) => {
  cloudinary.v2.uploader
    .destroy(`${assetId}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error deleting media from Cloudinary:", error);
      throw error;
    });
};

module.exports = {
  deleteMediaFromCloudinary,
};
