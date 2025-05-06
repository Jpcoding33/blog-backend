const router = require("express").Router();
const Category = require("../models/Category");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  const name = newCat.name;
  try {
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(200).json({ message: "Category already exists" });
    }
    const savedCat = await newCat.save();
    return res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const category = await Category.findOne({ name });
    if (!category) {
      return res.status(404).json("Category not found");
    }

    try {
      const postsWithCategory = await Post.find({ category: category.name });
      if (postsWithCategory.length > 0) {
        return res
          .status(204)
          .json(
            "Cannot delete category as it is associated with existing posts"
          );
      }
      await category.delete();
      res.status(200).json("Category has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
