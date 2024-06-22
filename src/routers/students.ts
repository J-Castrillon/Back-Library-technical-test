import { Router } from "express";
import { findUser, saveStudent } from "../controllers/students";
import { body } from "express-validator";
import { middlewares } from "../middleware/middleware";

const studentsRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Students:
 *      type: object
 *      properties:
 *        identification:
 *          type: integer
 *          description: User ID
 *          example: 1030723434
 *        name:
 *          type: string
 *          description: User name
 *          example: Julian
 *        lastNames:
 *          type: string
 *          description: User last names
 *          example: Castrillon
 *        program:
 *          type: Schema.ObjectId
 *          description: Id Program
 *          example: 6675b85dba3fcf09be13574f
 */

/**
 * @swagger
 * /api/v1/students/find:
 *  post:
 *    summary: Get a student
 *    tags:
 *      - Students
 *    description: Return an existing student
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              identification:
 *                type: integer
 *                example: 1030723434
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Students'
 *      404:
 *        description: Not found
 */
studentsRouter.post(
  "/find",
  body("identification")
    .notEmpty()
    .withMessage("The identification number is mandatory")
    .isNumeric()
    .withMessage("The identification should be numeric"),
  middlewares,
  findUser
);

/**
 * @swagger
 * /api/v1/students/:
 *  post:
 *    summary: Create a new Student
 *    tags:
 *      - Students
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              identification:
 *                type: integer
 *                example: 1030723434
 *              name:
 *                type: string
 *                example: Julian
 *              lastNames:
 *                type: string
 *                example: Castrillon
 *              program:
 *                type: Schema.ObjectId
 *                example: 6675b85dba3fcf09be13574f
 *    responses:
 *      201:
 *        description: Product created Successfully
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Students'
 */
studentsRouter.post(
  "/",
  body("name").notEmpty().withMessage("Nameless"),
  body("lastNames").notEmpty().withMessage("Not last names"),
  body("program").notEmpty().withMessage("No program"),
  body("identification")
    .notEmpty()
    .withMessage("The identification number is mandatory")
    .isNumeric()
    .withMessage("The identification should be numeric"),
  middlewares,
  saveStudent
);

export default studentsRouter;
