import { db } from "../../database/connection";
import { UserModel } from "./auth.types";

export type NewUserRow = Omit<UserModel, "id">;

export const repositoryCreateUser = (
  name: string,
  email: string,
  password_hash: string,
): NewUserRow => {
  const insert = db.prepare(
    `
      INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)
    `,
  );

  insert.run(name, email, password_hash);

  return { name, email, password_hash };
};

export const repositoryFindUserByEmail = (
  email: string,
): UserModel | undefined => {
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as UserModel | undefined;
};
