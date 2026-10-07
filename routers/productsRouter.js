import express from "express";

import {
    getProducts,
    createProducts,
    deleteProducts,
    getProductByName
} from "../controllers/productscontroller.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:name ", getProductByName);
productRouter.post("/", createProducts);

productRouter.delete("/:productName", deleteProducts);

export default productRouter;