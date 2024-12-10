import express from "express";
import axios from "axios";
import multer from 'multer';
import Detection from "../models/Detection.js";
import fs from 'fs';
import FormData from 'form-data';

const detection = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Use image buffer instead of reading from a file path
    const formData = new FormData();
    formData.append("file", image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    // Call Roboflow API
    const response = await axios.post(process.env.ROBOFLOW_MODEL_URL, formData, {
      params: {
        api_key: process.env.ROBOFLOW_API_KEY,
      },
      headers: {
        ...formData.getHeaders(), // Automatically sets the proper Content-Type header with boundary
      },
    });

    const data = response.data;
    console.log(data.predictions);

    // Process predictions
    const detections = data.predictions.map((prediction) => ({
      brand: prediction.class,
      // expiry_date: extractExpiryDate(prediction.text),
      // count: prediction.count,
      // expired: isExpired(prediction.text),
      // expected_lifespan: calculateLifespan(prediction.text),
    }));

    // Save detections to the database
    await Detection.insertMany(detections);

    res.json(detections);
  } catch (error) {
    console.error("Error processing detection:", error.message);
    res.status(500).send("Error processing detection");
  }
};

export default detection;