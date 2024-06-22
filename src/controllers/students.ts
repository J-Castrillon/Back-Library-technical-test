import { Request, Response } from "express";
import Student, { StudentInterface } from "../models/Student.model";

export const findUser = async (req: Request, res: Response) => {
  const { identification } = req.body;

  if (identification) {
    const student = await Student.findOne({ identification });

    if (student) {
      return res.status(200).json({
        status: "Success",
        student,
      });
    }else{
      return res.status(404).json({
        status: "Error",
        message: "Not Found",
      });
    }
  } else {
    return res.status(404).json({
      status: "Error",
      message: "Not Found",
    });
  }
};

export const saveStudent = async (req: Request, res: Response) => {
  const newUser: StudentInterface = req.body;

  const created = await Student.create(newUser);

  if (created) {
    res.status(201).json({
      status: "Success",
      created,
    });
  }
};
