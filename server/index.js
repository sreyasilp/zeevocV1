import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import extensionsRoute from "./routes/extensions.js";
import usersRoute from "./routes/user.js";
import blogPost from "./routes/blogPosts.js";
import services from "./routes/services.js";
import payments from "./routes/payment.js";
import orderRoutes from './routes/order.js';
// import cookieParser from 'cookie-parser';


const app = express();

// Middleware setup
// app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/extension", extensionsRoute);
app.use("/user", usersRoute);
app.use("/blog", blogPost);
app.use("/service", services);
app.use("/payment", payments);
app.use('/orders', orderRoutes);

const MONOGO_DB_CONN_URL =
  "mongodb+srv://code416:code416@code416.yzuornt.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4444;

mongoose
  .connect(MONOGO_DB_CONN_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log(`${error}:DB connection failed`);
  });
