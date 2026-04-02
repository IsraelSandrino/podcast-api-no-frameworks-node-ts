import { db } from "../database/connection";

export const repositoryCreateUser = (
  name: string,
  email: string,
  password_hash: string,
): any => {
  // Aqui daria para utilizar o UserModel criado como ': User Model =>'
  db.prepare(
    `
      INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)
    `,
  ).run(name, email, password_hash);

  return { name, email, password_hash };
};

export const repositoryFindUserByEmail = (email: string): any => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};
