import { Request, Response } from "express";
import Program, { ProgramInterface } from "../models/Program.model";

// En este caso solo creamos y leemos los programas, aunque tambien se pueden modificar y eliminar; 
export const getPrograms = async (req: Request, res: Response) => {
  const programs = await Program.find().sort({ created_at: -1 }).exec();

  if (programs) {
    return res.status(200).json({
      status: "Success",
      programs,
    });
  }
};

export const saveProgram = async (req: Request, res: Response) => {
  const newProgram : ProgramInterface = req.body;

  const created = await Program.create(newProgram);
  if (created) {
    res.status(201).json({
      status: "Success",
      created,
    });
  }
};
