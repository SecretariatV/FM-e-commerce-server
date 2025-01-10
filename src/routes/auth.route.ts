import { Router } from "express";

import { login, register } from "../controller/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints for user authentication and registration
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for user authentication and registration
 *
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows users to create a new account using their email and name.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address. Must be unique.
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 description: User's name.
 *                 example: Jon Doe
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login user with name
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address. Must be unique.
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: User login successfully.
 */
router.post("/login", login);

export default router;
