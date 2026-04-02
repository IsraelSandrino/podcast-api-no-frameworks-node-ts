import bcrypt from "bcrypt";
import {
  repositoryCreateUser,
  repositoryFindUserByEmail,
} from "../repositories/users-repository";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const SECRET = process.env.SECRET || " ";

// REGISTER
export const serviceRegister = (
  name: string,
  email: string,
  password: string,
) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  repositoryCreateUser(name, email, hash);
};

// LOGIN
export const serviceLogin = (email: string, password: string) => {
  const user = repositoryFindUserByEmail(email);

  if (!user) return null;

  const passwordMatch = bcrypt.compareSync(password, user.password_hash);

  if (!passwordMatch) return null;

  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });
};
