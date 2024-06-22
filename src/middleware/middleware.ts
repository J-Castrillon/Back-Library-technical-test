import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const middlewares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "Error",
      errors: errors.array(),
    });
  }
  next(); 
};
