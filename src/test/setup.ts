process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test_secret";

import { beforeEach, vi } from "vitest";
beforeEach(() => {
  vi.clearAllMocks();
});
