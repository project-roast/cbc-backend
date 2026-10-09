
import mongoose from "mongoose";
import { required } from "nodemon/lib/config";

const productSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true,
        unique: true
    },

    productName: {
        type: String,
        required: true
    },

    altname: [
        {
            type: String
        }
    ],

    images: [
        {
            type: String
        }
    ],

    price: {
        type: Number,
        required: true
    },

    lastprice: {
        type: Number,
        required: true
    },

    stock :{
        type : Number,
        required : true
    },

    description: {
        type: String,
        required: true
    }

});

const Product = mongoose.model("Product", productSchema);

export default Product;