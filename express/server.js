import router from "./Router/router.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/Name")
  .then(() => {
    console.log("Connecting to the MongoDB database ... ");
  })
  .catch((error) => {
    console.error("Connection failure", error);
  });


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use("/",router);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
