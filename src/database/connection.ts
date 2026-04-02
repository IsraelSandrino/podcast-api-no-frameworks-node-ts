import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "../../database.db");

export const db = new Database(dbPath);
