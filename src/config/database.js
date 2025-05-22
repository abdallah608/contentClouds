import dotenv from "dotenv";
import pg from "pg";
import { Sequelize } from "sequelize";

dotenv.config();

export const connection = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
      evict: 1000, 
      handleDisconnects: true
    }
    ,
    retry: {
      max: 3 
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = connection;

export default db;