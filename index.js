import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/modules/user/user.routes.js";
import globalError from "./src/utilities/error/globalError.js";
import appError from "./src/utilities/error/appError.js";
import cors from "cors";
import morgan from "morgan";
import db from "./src/config/dataBase.js";
import { apiLimiter } from "./src/utilities/rateLimiter/apiLimiter.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

  
// Database connection
console.log("-------------- start connecting database -------------- ");
const syncDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await db.sequelize.sync({ force: false, logging: false });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

syncDatabase();

// Routes
app.use("/users",apiLimiter, userRouter);


app.use(globalError);
    

// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));
