import dotenv from "dotenv";

import { logger } from "./logger";

dotenv.config();

const requiredEnvVariables = ["MONGO_URI"];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Environment variable ${key} is missing`);
  }
});

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI as string,
  frontendUrl: process.env.FRONTEND_URL as string,
  backendUrl: process.env.BACKEND_URL as string,
};
