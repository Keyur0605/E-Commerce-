const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/register");

const Auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({
            where: {
                Id: verifyUser.Id
            }
        });
        req.user = user.dataValues;
        next(); 
    } catch (err) {
        res.status(401).json({"msg": "Register Or Login again."});
    }
};

module.exports = Auth