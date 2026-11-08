import { Pool } from "pg";

export const db = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});