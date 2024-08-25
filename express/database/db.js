import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 100,
    },

    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
  }
);

const Model = model("Collections", schema);

export default Model;
