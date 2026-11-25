const express = require("express");
const router = express.Router();
const { Category, validate } = require("../Models/categoriesModel");


// List method
router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

// CREATE method
router.post("/", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // --
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

// SHOW method
router.get("/:id", (req, res) => {
  const category = Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("The category with the given Id is not found");

  res.send(category);
});

// UPDATE method
router.put("/:id", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true },
  );

  if (!category)
    return res.status(404).send("The category with the given Id is not found");

  res.send(category);
});

// DELETE method
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res
        .status(404)
        .send("The category with the given Id is not found");
    }

    res.send(category);
  } catch (err) {
    res.status(400).send("Invalid category ID");
  }
});

module.exports = router;
