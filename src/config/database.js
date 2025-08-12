import mongoose from "mongoose";

const connectToMongo = () => {
  mongoose
    .connect("mongodb://localhost/bookreview")
    .then(() => {
      console.log(">>> Connected to MongoDB <<<");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongo;