
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req, res) {

    const userData = req.body;

    userData.password = bcrypt.hashSync(userData.password, 10);

    const newUser = new User({
        Email: userData.Email,
        firstname: userData.firstname,
        Lastname: userData.Lastname,
        password: userData.password,
        userType: userData.userType
    });

    newUser.save()
        .then(() => {

            console.log(userData);

            res.json({
                message: "User created successfully"
            });

        })
        .catch((error) => {

            console.log(error);

            res.status(500).json({
                message: "User creation failed"
            });

        });
}


export function loginUser(req, res) {

    const email = req.body.Email;
    const password = req.body.password;

    User.find({ Email: email })
        .then((users) => {

            if (users.length == 0) {

                res.json({
                    message: "User not found"
                });

            } else {

                const user = users[0];

                const isPasswordCorrect =
                    bcrypt.compareSync(password, user.password);

                if (isPasswordCorrect) {
                    const token = jwt.sign({
                        Email : user.Email,
                        firstname : user.firstname,
                        Lastname : user.Lastname,
                        userType : user.userType
                    } , "cbc-secret-key-7973")
                    



                    res.json({
                        message: "User logged in",
                        token : token
                    })

                } else {

                    res.json({
                        message: "Invalid password"
                    });

                }
            }

        })
        .catch((error) => {

            console.log(error);

            res.status(500).json({
                message: "Login failed"
            });

        });
}


export function deleteUser(req,res){
     const email = req.body.Email;
    User.deleteOne({Email : email}).then(()=>{
        res.json({
            message : "Deleted User"
        })
    })

}

