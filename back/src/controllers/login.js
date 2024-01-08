const axios = require("axios").default;
const User = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        let { email, password, reCaptcha } = req.body;

        if (!(email && password && reCaptcha)) {
            return res.status(400).json({"msg": "Some field is empty."});
        }

        axios({
            url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptcha}`,
            method: "POST"
        }).then(async ({data}) => {
            if(data.success){
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
                if (emailRegex.test(email)) {
                    await User.findOne({
                        where: {
                            Email: email
                        }
                    }).then(async (item) => {
                        if (item && await bcrypt.compare(password, item.dataValues.Password)) {
                            const token = await jwt.sign({ Id: item.dataValues.Id }, process.env.JWT_SECRET_KEY);
                            return res.status(200).json({ "msg": "User login successfully.", token, name: item.dataValues.Name, admin: item.dataValues.isAdmin });
                        }
        
                        return res.status(401).json({ "msg": "User does not exist or password does not match." });
                    }).catch((err) => {
                        return res.send(err);
                    });
                }else{
                    return res.status(400).json({"msg": "Email is invalid."});
                }
            }
        }).catch((err) => {
            res.status(400).json({"msg": "Invalid Recaptcha."});;
        })
    } catch (err) {
        res.send(err);
    }
};

module.exports = loginUser