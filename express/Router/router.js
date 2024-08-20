import Joi from "joi";
//import Model from "./database/db.js";
import { Router } from "express";

const router = Router();

const userSchma = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(16).max(100).required(),
  email: Joi.string().min(10).max(100).required(),
});

const array = Joi.array().items(userSchma);

const data = [
    {
        name:"David",
        age:18,
        email:"daviddiem18@example.com"
    }
]

router.get("/", (req, res) => {
  const { error, value } = array.validate(data);
  if (error) {
    res.status(400).send(error.details);
  } else {
    res.status(200).json(value);
  }
});

export default router;
