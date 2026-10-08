
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routers/productsRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from "jsonwebtoken";




const app = express();

const mongoUrl = "mongodb+srv://isankalakshan17444_db_user:woAkfpgHFAAjPEex@cluster0.iy6wloh.mongodb.net/?appName=Cluster0";

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

        jwt.verify(token, "cbc-secret-key-7973", (error, decoded) => {

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
