import { Router } from "express";
import { body, param } from "express-validator";
import { middlewares } from "../middleware/middleware";
import {
  deleteLoan,
  getLoans,
  saveLoan,
  updateLoan,
} from "../controllers/loans";

const loansRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Loans:
 *       type: object
 *       properties:
 *         student:
 *           type: Schema.ObjectId
 *           description: Studdent ID 
 *           example: 6675bc7b8b270e55200f4064
 *         asset:
 *           type: Schema.ObjectId
 *           description: Asset ID
 *           example: 6675cb29c4d679c2a72863c6
 *         period:
 *           type: date
 *           description: Date to return
 *           example: 2023-06-21T12:00:00Z
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Created date
 *           example: 2023-06-21T12:00:00Z
 */



/**
 * @swagger
 * /api/v1/loans: 
 *  get: 
 *    sumary: Get a loans list
 *    tags: 
 *      - Loans
 *    description: Return a list of loans
 *    responses: 
 *      200: 
 *        description: Successful response
 *        content: 
 *          application/json: 
 *            schema: 
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Loans'
 */
loansRouter.get("/", getLoans);

/**
 * @swagger
 * /api/v1/loans: 
 *  post: 
 *    sumary: Create a new Loan
 *    tags: 
 *      - Loans
 *    description: Return a new record in the database
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object
 *            properties: 
 *              student: 
 *                type: string
 *                example: 6675bc7b8b270e55200f4064
 *              asset: 
 *                type: string
 *                example: 6675bc7b8b270e55200f4064
 *    responses: 
 *      201: 
 *        description: Product created Successfully
 *        content: 
 *          application/json: 
 *            schema: 
 *               $ref: '#/components/schemas/Assets'
 *      500: 
 *        description: Resource no available
 */
loansRouter.post(
  "/",
  body("student")
    .notEmpty()
    .withMessage("Student ID is required")
    .isString()
    .withMessage("Format incorrect"),
  body("asset")
    .notEmpty()
    .withMessage("Asset ID is required")
    .isString()
    .withMessage("Format incorrect"),
  middlewares,
  saveLoan
);

/**
 * @swagger
 * /api/v1/loans/{id}: 
 *  put: 
 *    sumary: Update an existing Loan
 *    tags: 
 *      - Loans
 *    description: Successfully message
 *    parameters: 
 *      - in: path
 *        name: id
 *        description: The Loan ID
 *        required: true
 *        schema: 
 *          type: string
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json: 
 *          schema: 
 *            type: object
 *            properties: 
 *              student: 
 *                type: string
 *                example: 6675bc7b8b270e55200f4064
 *              asset: 
 *                type: string
 *                example: 6675bc7b8b270e55200f4064
 *    responses: 
 *      200: 
 *        description: Product created Successfully
 *        content: 
 *          application/json: 
 *            schema: 
 *               $ref: '#/components/schemas/Assets'
 *      404:
 *        description: Not found 
 *      500: 
 *        description: Invalid ID
 * 
 */
loansRouter.put(
  "/:id",
  param("id").notEmpty().withMessage("No id"),
  body("student")
    .notEmpty()
    .withMessage("Student ID is required")
    .isString()
    .withMessage("Format incorrect"),
  body("asset")
    .notEmpty()
    .withMessage("Asset ID is required")
    .isString()
    .withMessage("Format incorrect"),
  middlewares,
  updateLoan
);


/**
 * @swagger
 * /api/v1/loans/{id}: 
 *  delete: 
 *    sumary: Delete an existing Loan
 *    tags: 
 *      - Loans
 *    description: Return a successfully message
 *    parameters: 
 *      - in: path
 *        name: id
 *        required: true
 *        schema: 
 *          type: string
 *    responses: 
 *      200: 
 *        description: Product removed Successfully
 *      404: 
 *        description: Not found
 *      500: 
 *        description: Invalid id
 */
loansRouter.delete("/:id", middlewares, deleteLoan);

export default loansRouter;
