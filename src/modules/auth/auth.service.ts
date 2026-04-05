import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  repositoryCreateUser,
  repositoryFindUserByEmail,
} from "./auth.repository";
import { AppError } from "../../shared/errors/app-error";
import { StatusCode } from "../../utils/status-code";

const saltRounds = 10;

const getJwtSecret = (): string => {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new AppError(
      "JWT secret not configured",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }

  return secret;
};
export const serviceRegister = (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = repositoryFindUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email já cadastrado", StatusCode.BAD_REQUEST);
  }

  const hash = bcrypt.hashSync(password, saltRounds);
  repositoryCreateUser(name, email, hash);

  return { message: "Usuário registrado com sucesso!" };
};
export const serviceLogin = (email: string, password: string) => {
  const user = repositoryFindUserByEmail(email);

  if (!user) return null;

  const passwordMatch = bcrypt.compareSync(password, user.password_hash);

  if (!passwordMatch) return null;

  return jwt.sign({ id: user.id, email: user.email }, getJwtSecret(), {
    expiresIn: "1d",
  });
};
