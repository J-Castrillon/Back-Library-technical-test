import { Router } from "express";
import { body, param } from "express-validator";
import {
  deleteAsset,
  getAssets,
  getAssetsInLoans,
  saveAsset,
  showImage,
  uploads,
} from "../controllers/assets";
import { middlewares } from "../middleware/middleware";
import multer from "multer";
import path from "path";

const assetsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the author
 *           example: Robert C. Martin
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth of the author
 *           example: 1952-10-31
 *         placeOfBirth:
 *           type: string
 *           description: Place of birth of the author
 *           example: New York City
 *     Assets:
 *       type: object
 *       properties:
 *         asset:
 *           type: string
 *           description: Asset name
 *           example: Clean Code
 *         publicationDate:
 *           type: string
 *           format: date-time
 *           description: Publication date
 *           example: 2023-06-21T12:00:00Z
 *         author:
 *           $ref: '#/components/schemas/Author'
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Created date
 *           example: 2023-06-21T12:00:00Z
 */

/**
 * @swagger
 * /api/v1/assets:
 *  get:
 *    sumary: Get a assets list
 *    tags:
 *      - Assets
 *    description: Return a list of assets
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Assets'
 */
assetsRouter.get("/", getAssets);

/**
 * @swagger
 * /api/v1/assets/loans:
 *   get:
 *     summary: Get all assets currently in loans
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: A list of assets currently in loans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 assets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       name:
 *                         type: string
 *                         example: "Laptop"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2021-06-23T18:25:43.511Z"
 *       404:
 *         description: No assets found in loans
 *       500:
 *         description: Server error
 */
 assetsRouter.get('/loans', getAssetsInLoans);

/**
 * @swagger
 * /api/v1/assets:
 *  post:
 *    sumary: Create a new Asset
 *    tags:
 *      - Assets
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              asset:
 *                type: string
 *                example: Clean Code
 *              publicationDate:
 *                type: date
 *                example: 2023-06-21T12:00:00Z
 *              author:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Julian
 *                   dateOfBirth:
 *                     type: date
 *                     example: 2023-06-21T12:00:00Z
 *                   placeOfBirth:
 *                     type: date
 *                     example: 2023-06-21T12:00:00Z
 *    responses:
 *      201:
 *        description: Product created Successfully
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Assets'
 */
assetsRouter.post(
  "/",
  body("asset").notEmpty().withMessage("Nameless"),
  body("publicationDate").notEmpty().withMessage("No publication date"),
  body("author").notEmpty().withMessage("No Author information"),
  middlewares,
  saveAsset
);

/**
 * @swagger
 * /api/v1/assets/uploads/{id}:
 *   post:
 *     summary: Upload a file for a specific asset
 *     tags:
 *       - Assets
 *     description: Uploads an image file for the specified asset ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the asset
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file0:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Imagen cargada correctamente
 *       400:
 *         description: Invalid image format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Imagen invalida
 *       404:
 *         description: No file was sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: No se envio ningun archivo
 *       500:
 *         description: Error in file upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Error en la carga del archivo
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `asset-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
assetsRouter.post("/uploads/:id", upload.single("file0"), uploads);


/**
 * @swagger
 * /api/v1/assets/uploads/{fichero}:
 *   get:
 *     summary: Retrieve an image file
 *     tags:
 *       - Assets
 *     description: Returns an image file stored in the uploads directory
 *     parameters:
 *       - in: path
 *         name: fichero
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to retrieve
 *     responses:
 *       200:
 *         description: The image file
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/gif:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Not found
 */
assetsRouter.get(
  "/uploads/:fichero",
  param("fichero").notEmpty().withMessage("No file path"),
  middlewares,
  showImage
);

/**
 * @swagger
 * /api/v1/assets/{id}:
 *  delete:
 *    sumary: Delete an existing Asset
 *    tags:
 *      - Assets
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
assetsRouter.delete(
  "/:id",
  param("id").notEmpty().withMessage("No id"),
  middlewares,
  deleteAsset
);

export default assetsRouter;
