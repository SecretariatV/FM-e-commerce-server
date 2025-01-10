import { Router } from "express";

import { auth } from "../middleware";
import { create } from "../controller/part.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Part
 *  description: Endpoints for management of parts
 */

/**
 * @swagger
 * /api/v1/part/create:
 *   post:
 *     summary: Create a new part
 *     tags:
 *       - Part
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of part.
 *                 example: test
 *     responses:
 *       201:
 *         description: Part create successfully.
 */

router.post("/create", auth, create);

router.post("/remove", auth);

router.get("/list", auth);

export default router;
