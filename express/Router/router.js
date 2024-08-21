import Joi from "joi";
import Model from "../database/db.js";
import { Router } from "express";

const router = Router();

const userSchma = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
});

const array = Joi.array().items(userSchma);

const data = [
  {
    name: "David",
    age: 18,
    email: "daviddiem18@example.com",
  },

  {
    name: "Rachel",
    age: 34,
    email: "rachelsandra20@example.com",
  },
];

router.get("/", async(req, res) => {
  const { error, value } = array.validate(data);
  if (error) {
    res.status(400).send(error.details);
  } else {
    res.status(200).json(value);
  }
await value.save();
});

router.post("/create", async (req, res) => {
  const { error, value } = array.validate(req.body);
  const createUser = new Model(value);
  if (error) {
    res.status(400).send(error.details);
  } else {
    res.status(200).json(createUser);
  }
  await createUser.save();
});

export default router;
