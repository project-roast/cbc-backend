import Products from "../models/products.js";

export function getProducts(req, res) {

    Products.find()
        .then((productList) => {
            res.json({
                list: productList
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Failed to get products"
            });
        });
}

export function createProducts(req, res) {

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

    product.save()
        .then(() => {

            console.log("Product created");

            res.json({
                message: "Product created successfully"
            });

        })
        .catch((error) => {

            console.log(error);

            res.status(500).json({
                message: "Product not created"
            });

        });
}

export function deleteProducts(req, res) {

    Products.deleteOne({
        productName: req.params.productName
    })
        .then(() => {

            res.json({
                message: "Product deleted successfully"
            });

        })
        .catch((error) => {

            console.log(error);

            res.status(500).json({
                message: "Product deletion failed"
            });

        });
}

export function getProductByName(req, res){
    const name = req.params.name;
    res.json({
        message : "Product name is "+ name
    });
}