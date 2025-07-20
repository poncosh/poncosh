import { Sequelize } from "sequelize";
import pg from "pg";

// Optional: You may want to validate or cast the env vars
const database = process.env.POSTGRES_DATABASE as string;
const username = process.env.POSTGRES_USER as string;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_URI;
const port = parseInt(process.env.POSTGRES_PORT || "5432", 10);

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "postgres",
  dialectModule: pg,
});

export default sequelize;
