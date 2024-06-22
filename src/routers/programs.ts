import { Router } from "express";
import { getPrograms, saveProgram } from "../controllers/programs";
import { middlewares } from "../middleware/middleware";
import { body } from "express-validator";

const programsRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Programs:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Program name
 *          example: Ingeniería
 *        created_at:
 *          type: date
 *          description: Program date
 *          example: 2023-06-21T12:00:00Z
 */

/**
 * @swagger
 * /api/v1/programs: 
 *  get: 
 *    sumary: Get a program list
 *    tags: 
 *      - Programs
 *    description: Return a list of programs
 *    responses: 
 *      200: 
 *        description: Successful response
 *        content: 
 *          application/json: 
 *            schema: 
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Programs'
 */
programsRouter.get("/", getPrograms);

/**
 * @swagger
 * /api/v1/programs: 
 *  post: 
 *    sumary: Create a new Program
 *    tags: 
 *      - Programs
 *    description: Return a new record in the database
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object
 *            properties: 
 *              name: 
 *                type: string
 *                example: Ingeniería mecánica
 *    responses: 
 *      201: 
 *        description: Product created Successfully
 *        content: 
 *          application/json: 
 *            schema: 
*                $ref: '#/components/schemas/Programs'
 */
programsRouter.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("Nameless")
    .isString()
    .withMessage("Format incorrect"),
  middlewares,
  saveProgram
);

export default programsRouter;
