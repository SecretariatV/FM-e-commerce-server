import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import request from "supertest";

import User from "../../model/user.model";
import app from "../../app";

vi.mock("../../model/user.model");

describe("Auth Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user successfully", async () => {
      (User.findOne as Mock).mockResolvedValue(null);
      (User.prototype.save as Mock).mockResolvedValue({
        name: "John Doe",
        email: "user@example.com",
      });

      const response = await request(app).post("/api/v1/auth/register").send({
        name: "John Doe",
        email: "user@example.com",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        "User registered. Please verify your email to log in."
      );
      expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
      expect(User.prototype.save).toHaveBeenCalled();
    });

    it("should return 500 if the user already exists", async () => {
      (User.findOne as Mock).mockResolvedValue({ email: "user@example.com" });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({ name: "John Doe", email: "user@example.com" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("User already exists.");
      expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should log in a user successfully", async () => {
      (User.findOne as Mock).mockResolvedValue({
        email: "user@example.com",
        name: "John Doe",
      });

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "user@example.com",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Success login");
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    });

    it("should return 500 if the user is not found", async () => {
      (User.findOne as Mock).mockResolvedValue(null);

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "notfound@example.com",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Can't find this user.");
      expect(User.findOne).toHaveBeenCalledWith({
        email: "notfound@example.com",
      });
    });
  });
});
