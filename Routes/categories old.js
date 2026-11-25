const express = require("express");
const joi = require("joi");

const router = express.Router();

const categories = [
  { id: 1, name: "Web" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Marketing" },
];

router.get("/api/categories", (req, res) => {
  res.send(categories);
});

router.post("/api/categories", (req, res) => {
  // validation
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // --
  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  categories.push(category);
  res.send(category);
});

router.get("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given Id is not found");

  if (error) return res.status(400).send(error.details[0].message);
  res.send(category);
});

router.put("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given Id is not found");

  if (error) return res.status(400).send(error.details[0].message);

  category.name = req.body.name;
  res.send(category);
});

router.delete("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the given Id is not found");

  const index = categories.indexOf(category);
  categories.splice(index, 1);

  res.send(category);
});

function validateData(category) {
  const schema = {
    name: joi.string().min(3).required(),
  };

  return joi.validate(category, schema);
}

module.exports = router;
