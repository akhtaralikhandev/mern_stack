import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";
import postRouter from "./routes/post.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5001;
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/post", postRouter);
app.use("/user", userRoute);

const CONNECTION_URL = process.env.MONGO_URI;
app.use(express.static(path.join(__dirname, "/client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT || PORT, () =>
      console.log(`Server Running on Port: http://localhost:`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
