import { Request, Response } from "express";
import Loan, { LoansInterface } from "../models/Loans.model";
import mongoose from "mongoose";
import Student from "../models/Student.model";
import Asset from "../models/Asset.model";

export const getLoans = async (req: Request, res: Response) => {
  const loans = await Loan.find()
    .sort({ created_at: -1 })
    .populate("student")
    .populate("asset")
    .exec();

  if (loans) {
    return res.status(200).json({
      status: "Success",
      loans,
    });
  }
};

export const saveLoan = async (req: Request, res: Response) => {
  const existingLoan = await Loan.findOne({ asset: req.body.asset });

  if (!existingLoan) {
    const newLoan: LoansInterface = req.body;

    const created = await Loan.create(newLoan);
    if (created) {
      return res.status(201).json({
        status: "Success",
        created,
      });
    }
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Resource no available",
    });
  }
};

export const updateLoan = async (req: Request, res: Response) => {
  const idLoan = req.params.id;

  if (mongoose.Types.ObjectId.isValid(idLoan)) {
    const updated = await Loan.findOneAndUpdate({ _id: idLoan }, req.body);

    if (updated) {
      return res.status(200).json({
        status: "Success",
        updated,
      });
    } else {
      return res.status(404).json({
        status: "Error",
        message: "Not Found",
      });
    }
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Invalid id",
    });
  }
};

export const deleteLoan = async (req: Request, res: Response) => {
  const idLoan = req.params.id;

  if (mongoose.Types.ObjectId.isValid(idLoan)) {
    const findAsset = await Loan.findOne({ _id: idLoan });

    if (!findAsset) {
      return res.status(404).json({
        status: "Error",
        message: "Not Found",
      });
    } else {
      const removed = await Loan.findOneAndDelete({ _id: idLoan });
      if (removed) {
        return res.status(200).json({
          status: "Success",
          message: "Asset removed",
        });
      }
    }
  } else {
    return res.status(500).json({
      status: "Error",
      message: "Invalid id",
    });
  }
};
