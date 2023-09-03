import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/user.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/product", productsRoute);
app.use("/user", usersRoute);

const MONOGO_DB_CONN_URL =
  "mongodb+srv://code416:code416@code416.yzuornt.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

mongoose
  .connect(MONOGO_DB_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log(`${error}:DB connection failed`);
  });