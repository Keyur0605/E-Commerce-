const { uuid } = require("uuidv4");
const User = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        let { name, email, password, cpassword } = req.body;

        if (!(name && email && password && cpassword && password == cpassword)) {
            return res.status(400).json({ "msg": "Some field is empty or password does not match." });
        }

        password = await bcrypt.hash(password, 10);

        await User.findOne({
            where: {
                Email: email
            } 
        }).then(async (item) => {
            if(item){
                return res.status(409).json({ "msg": "User already exists." });
            }else{
                await User.create({
                    Id: uuid(),
                    Name: name,
                    Email: email,
                    Password: password
                }).then(async (item) => {
                    const token = await jwt.sign({ Id: item.dataValues.Id }, process.env.JWT_SECRET_KEY);
                    return res.status(201).json({ "msg": "User created.", token, name: item.dataValues.Name });
                }).catch((err) => {
                    if(err.errors[0].type == "Validation error"){
                        return res.status(409).json({ "msg": "Email is invalid." });
                    }

                    res.send(err);
                });
            }
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = registerUser