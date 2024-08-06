import mongoose from "mongoose";

export function connect() {
  if (mongoose.connection.readyState >= 1) return;
  mongoose
    .connect(process.env.MONGO_URL!, {
      tls: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("There is some error in connecting to the database", err);
    });
}
