const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: false,
      },
      assetId: {
        type: String,
        required: false,
      },
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
