import Joi from "joi";
import Model from "../database/db.js";
import { Router } from "express";
import data from "../database/data.js";

const router = Router();

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(1).required(),
    email: Joi.string().email().required(),
});

const array = Joi.array().items(userSchema);

//Create my data in the database
router.post("/user", async (req, res) => {
    const { error, value } = array.validate(data);
    if (error) {
        return res.status(400).send(error.details);
    }
    try {
        const createMethod = await Model.insertMany(value);
        res.status(200).json(createMethod);
    } catch (error) {
        console.error("Server error detail:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Read data from my database
router.get("/", async (req, res) => {
    try {
        const findData = await Model.find();
        res.status(200).json(findData);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: `Internal server error at: ${error}` });
    }
});

//Update data from the database
router.put("/user/:id", async (req, res) => {
    const { error, value } = array.validate(req.body);
    const userID = req.params.id;

    console.log("User ID:", userID);
    console.log("Update Data:", value);
    if (error) {
        console.log("Validation Error:", error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updateMethod = await Model.findByIdAndUpdate(userID, value, {
            new: true,
            runValidators: true,
        });

        if (!updateMethod) {
            return res.status(404).json({ message: "ID Not Found" });
        }
        res.status(200).json(updateMethod);
    } catch (error) {
        console.error("Internal server error");
        res.status(500).json(error);
    }
});

export default router;
