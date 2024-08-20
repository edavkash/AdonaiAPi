import Joi from "joi";
import { Router } from "express";

const router = Router();

const userSchma = Joi.object({
  name: Joi.string().Joi.min(3).max(30).require(),
  age: Joi.number().Joi.min(16).max(100).require(),
  email: Joi.string().joi.min(10).joi.max(100).require(),
});

const array = Joi.array().items(userSchma);

const data = [
    {
        "name":"David",
        "age":"18",
        "email":"daviddiem18@example.com"
    }
]

router.get("/", (req, res) => {
  const { error, value } = array.validate(data);
  if (error) {
    res.status(400).send(error.details);
  } else {
    res.status(200).send(value);
  }
});

export default router;
