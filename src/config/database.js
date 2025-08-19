import mongoose from "mongoose";

const connectToMongo = () => {
  mongoose
    .connect("mongodb+srv://duclhgcs220253:j3jYDnxd5EVrzFIf@bookreview.ebpv3oi.mongodb.net/test")
    .then(() => {
      console.log(">>> Connected to MongoDB <<<");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToMongo;