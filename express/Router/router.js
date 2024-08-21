import Joi from "joi";
import Model from "../database/db.js";
import { Router } from "express";

const router = Router();

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
});

const array = Joi.array().items(userSchema);

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

router.get("/", async (req, res) => {
  const { error, value } = array.validate(data);
  if (error) {
    return res.status(400).send(error.details);
  }
  try {
    const method = new Model(value);
    await method.save();
    res.status(200).json(method);
  } catch (error) {
    res.status(400).json({ message: "Bad Request:", error });
  }
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
