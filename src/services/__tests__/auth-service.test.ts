import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { serviceLogin, serviceRegister } from "../auth-service";
import * as repository from "../../repositories/users-repository";

describe("auth-service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("serviceRegister", () => {
    it("deve gerar o hash da senha e salvar o usuário no repositório", () => {
      const hashSpy = vi
        .spyOn(bcrypt, "hashSync")
        .mockReturnValue("senha_hash");

      const repositorySpy = vi
        .spyOn(repository, "repositoryCreateUser")
        .mockReturnValue(undefined as any);

      const result = serviceRegister(
        "Usuario Teste",
        "usuario_teste@gmail.com",
        "senha_teste",
      );

      expect(hashSpy).toHaveBeenCalledWith("senha_teste", 10);
      expect(repositorySpy).toHaveBeenCalledWith(
        "Usuario Teste",
        "usuario_teste@gmail.com",
        "senha_hash",
      );
      expect(result).toBeUndefined();
    });
  });

  describe("serviceLogin", () => {
    it("deve retornar null  quand o usuário não existir", () => {
      const repositorySpy = vi
        .spyOn(repository, "repositoryFindUserByEmail")
        .mockReturnValue(null);

      const compareSpy = vi.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      const result = serviceLogin("usuario_teste@gmail.com", "senha_teste");

      expect(repositorySpy).toHaveBeenCalledWith("usuario_teste@gmail.com");
      expect(compareSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("deve retornar null quando a senha estiver incorreta", () => {
      const userMock = {
        id: 1,
        name: "Usuario Teste",
        email: "usuario_teste@gmail.com",
        password_hash: "senha_hash",
      };

      vi.spyOn(repository, "repositoryFindUserByEmail").mockReturnValue(
        userMock,
      );

      const compareSpy = vi.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      const jwtSpy = vi.spyOn(jwt, "sign");

      const result = serviceLogin("usuario_teste@gmail.com", "senha_incorreta");

      expect(compareSpy).toHaveBeenCalledWith("senha_incorreta", "senha_hash");
      expect(jwtSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it("deve retornar um token JWT quando email e senha estiverem corretos", () => {
      const userMock = {
        id: 1,
        name: "Usuario Teste",
        email: "usuario_teste@gmail.com",
        password_hash: "senha_hash",
      };

      vi.spyOn(repository, "repositoryFindUserByEmail").mockReturnValue(
        userMock,
      );
      vi.spyOn(bcrypt, "compareSync").mockReturnValue(true);
      const jwtSpy = vi
        .spyOn(jwt, "sign")
        .mockReturnValue("token-jwt" as never);

      const result = serviceLogin("usuario_teste@gmail.com", "senha_correta");

      expect(jwtSpy).toHaveBeenCalledWith(
        { id: 1, email: "usuario_teste@gmail.com" },
        " ",
        { expiresIn: "1d" },
      );

      expect(result).toBe("token-jwt");
    });
  });
});
