
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routers/productsRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();



const app = express();

const mongoUrl = process.env.MONGO_DB_URI;


mongoose.connect(mongoUrl,{});
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database Connected");
})


app.use(bodyParser.json());

app.use((req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token:", token);

    if (token != null) {

        jwt.verify(token,process.env.SECRET, (error, decoded) => {

            if (!error) {
                req.user = decoded;
                console.log("User:", req.user);
            } else {
                console.log("Invalid token");
            }

        });
    }

    next();
});


app.use("/api/products", productRouter);
app.use("/api/users", userRouter);




app.listen(
    5000,
    ()=>{
        console.log("Server running on port 5000");
    }
);
