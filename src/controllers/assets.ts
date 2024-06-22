import { Request, Response } from "express";
import Asset, { AssetInterface } from "../models/Asset.model";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Loans from "../models/Loans.model";

export const getAssets = async (req: Request, res: Response) => {
  const loans = await Loans.find().exec();

  const loanedAssetIds = loans.map((loan) => loan.asset);

  const assets = await Asset.find({
    _id: { $nin: loanedAssetIds },
  })
    .sort({ created_at: -1 })
    .exec();

  if (assets) {
    return res.status(200).json({
      status: "Success",
      assets,
    });
  }
};

export const getAssetsInLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loans.find().exec();

    const loanedAssetIds = loans.map((loan) => loan.asset);

    const assets = await Asset.find({
      _id: { $in: loanedAssetIds },
    })
      .sort({ created_at: -1 })
      .exec();

    if (assets) {
      return res.status(200).json({
        status: "Success",
        assets,
      });
    } else {
      return res.status(404).json({
        status: "Not Found",
        message: "No assets found in loans",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const saveAsset = async (req: Request, res: Response) => {
  const newAsset: AssetInterface = req.body;

  const created = await Asset.create(newAsset);
  if (created) {
    res.status(201).json({
      status: "Success",
      created,
    });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  const idAsset = req.params.id;

  if (mongoose.Types.ObjectId.isValid(idAsset)) {
    const findAsset = await Asset.findOne({ _id: idAsset });

    if (!findAsset) {
      return res.status(404).json({
        status: "Error",
        message: "Not Found",
      });
    } else {
      const removed = await Asset.findOneAndDelete({ _id: idAsset });
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

export const uploads = async (req: Request, res: Response) => {
  const idAsset = req.params.id;

  if (!req.file) {
    return res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  }

  const file = req.file.filename;

  console.log(file);

  const ext = req.file.filename.split(".")[1];

  if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "gif") {
    // Borrar archivo;
    fs.unlink(req.file.path, () => {
      return res.status(400).json({
        status: "Error",
        message: "Imagen invalida",
      });
    });
  } else {
    const sendUpdate = await Asset.findOneAndUpdate(
      { _id: idAsset },
      { image: file }
    );

    if (!sendUpdate) {
      return res.status(500).json({
        status: "Error",
        message: "Error en la carga del archivo",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Imagen cargada correctamente",
    });
  }
};

export const showImage = async (req: Request, res: Response) => {
  const fichero = req.params.fichero;

  const filePath = path.resolve(__dirname, "../../uploads", fichero);
  fs.stat(filePath, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(filePath));
    } else {
      return res.status(404).json({
        status: "Error",
        message: "Not fund",
      });
    }
  });
};
