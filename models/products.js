import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    description: String
});

const Products = mongoose.model("products", productSchema);

export default Products;