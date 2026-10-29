
import Product from "../models/product.js";

export function isAdmin(req) {
    return req.user != null &&
           req.user.userType === "admin";
}

export async function createProduct(req, res) {
    try {
        // Check admin permission
        if (!isAdmin(req)) {
            return res.status(403).json({
                message: "Only admins can create products"
            });
        }

        console.log("Received product data:", req.body);

        const newProduct = new Product({
            productId: req.body.productId,
            productName: req.body.productName,
            altname: req.body.altname,
            images: req.body.images,
            price: req.body.price,
            lastprice: req.body.lastprice,
            description: req.body.description
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {
        console.error("PRODUCT ERROR:", error);

        return res.status(500).json({
            message: "Product creation failed",
            error: error.message
        });
    }
}

export async function getProducts(req, res) {
    try {
        const productList = await Product.find();

        return res.status(200).json({
            list: productList
        });

    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);

        return res.status(500).json({
            message: "Failed to get products",
            error: error.message
        });
    }
}