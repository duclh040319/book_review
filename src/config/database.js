import mongoose from "mongoose";

const connectToMongo = () => {
  mongoose
    .connect("mongodb+srv://duclhgcs220253:<db_password>@bookreview.ebpv3oi.mongodb.net/")
    .then(() => {
      console.log(">>> Connected to MongoDB <<<");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongo;