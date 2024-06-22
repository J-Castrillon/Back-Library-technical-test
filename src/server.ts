import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { Request, Response } from "express";
import dbConnect from "./db/db";
import programsRouter from "./routers/programs";
import studentsRouter from "./routers/students";
import assetsRouter from "./routers/assets";
import loansRouter from "./routers/loans";
import swaggerUi from 'swagger-ui-express'; 
import swaggerSpec, { swaggerUiOptions } from "./db/swagger";

// Database;
dbConnect();

const server = express();

server.use(express.json());

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (origin === process.env.CLIENT_URL) {
//       callback(null, true);
//     } else {
//       callback(new Error("Error CORS"), false);
//     }
//   },
// };

server.use(cors());

server.use(morgan("dev"));

server.get("/api/v1/", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "Success",
    message: "It's ok!",
  });
});

// Routers; 
server.use("/api/v1/programs", programsRouter);
server.use("/api/v1/students", studentsRouter);
server.use("/api/v1/assets", assetsRouter);
server.use("/api/v1/loans", loansRouter);

// Documentation; 
server.use('/sources', express.static('sources')); // Imagen del header; 
server.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;