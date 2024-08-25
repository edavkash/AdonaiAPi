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
router.post("/", async (req, res) => {
    const { error, value } = array.validate(data);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    try {
        const createdData = await Model.insertMany(value);
        res.status(200).json(createdData);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Read my data from the client side
router.get("/", async (req, res) => {
    try {
        const users = await Model.find(req.body);
        res.status(200).send(users);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Update my data from the database
router.put("/:id", async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    try {
        const updateUser = await Model.findByIdAndUpdate(req.params.id, value, {
            new: true,
        });
        if(!updateUser){
            return res.status(404).json({msg:"User Not Found"})
        }
        res.status(200).send(updateUser);
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error:" });
    }
});

export default router;
