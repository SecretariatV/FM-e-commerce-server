import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import request from "supertest";

import app from "../../app";
import Part from "../../model/part.model";

vi.mock("../../model/part.model");

describe("Part Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/v1/part/create", () => {
    it("should create a new part successfully", async () => {
      (Part.findOne as Mock).mockResolvedValue(null);
      (Part.prototype.save as Mock).mockResolvedValue({
        name: "Model 1",
      });

      const response = await request(app)
        .post("/api/v1/part/create")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODE1YTA3NDM1ZTVjYzJhMWY5YTU1ZSIsImlhdCI6MTczNjUzMDgzMSwiZXhwIjoxNzM2NjE3MjMxfQ.S6rDEm0R7b6BYRMAMXhkKCKLtfIPHk-O-picXAfqblk"
        )
        .send({
          name: "Model 1",
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("New part created");
      expect(Part.findOne).toHaveBeenCalledWith({ name: "Model 1" });
      expect(Part.prototype.save).toHaveBeenCalled();
    });

    it("should return 500 if the part already exists", async () => {
      (Part.findOne as Mock).mockResolvedValue({ name: "Model-1" });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODE1YTA3NDM1ZTVjYzJhMWY5YTU1ZSIsImlhdCI6MTczNjUzMDgzMSwiZXhwIjoxNzM2NjE3MjMxfQ.S6rDEm0R7b6BYRMAMXhkKCKLtfIPHk-O-picXAfqblk"
        )
        .send({ name: "Model-1" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Part already exist");
      expect(Part.findOne).toHaveBeenCalledWith({ name: "Model-1" });
    });
  });
});
