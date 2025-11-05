import { Surreal } from "surrealdb";

const SURREAL_URL = process.env.SURREAL_URL;
const SURREAL_PASS = process.env.SURREAL_PASS || process.env.SURREAL_PASSWORD;
const SURREAL_USER = process.env.SURREAL_USER;

export const connect = async () => { 
  const db = new Surreal();
  await db.connect(SURREAL_URL!);
  await db.use({
      namespace: "test",
      database: "test"
  });
  await db.signin({
    username: SURREAL_USER!,
    password: SURREAL_PASS!,
  });
  return db;
}