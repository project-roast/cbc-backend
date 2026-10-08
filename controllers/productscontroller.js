import Products from "../models/products.js";

export async function getProducts(req, res) {
    try {
        const productList = await Products.find();

        console.log(productList);

        res.status(200).json({
            list: productList
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get products",
            error: error.message
        });
    }
}

export async function createProducts(req, res) {

    console.log(req.user);

    if (req.user == null) {
        res.json({
            message: "You are not logged in"
        });
        return;
    }

    if (req.user.userType != "admin") {
        res.json({
            message: "You are not admin"
        });
        return;
    }

    const product = new Products(req.body);

    try {
        await product.save();

        res.json({
            message: "Product created successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Product not created"
        });
    }
}

export async function deleteProducts(req, res) {

    try {

        await Products.deleteOne({
            productName: req.params.productName
        });

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Product deletion failed"
        });
    }
}

export function getProductByName(req, res) {

    const name = req.params.name;

    res.json({
        message: "Product name is " + name
    });
}