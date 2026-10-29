import express from "express";

import { createProduct,getProducts } from "../controllers/productController.js";


const productRouter = express.Router();

// View products — public access
productRouter.get("/", getProducts);

// Create products — requires a verified token
productRouter.post("/", createProduct);

export default productRouter;