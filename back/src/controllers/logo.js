const { uuid } = require("uuidv4");
const Logo = require("../models/logo");

// Add Logo

const addLogo = async (req, res) => {
    try {
        let { logo } = req.body;

        if (!logo) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await Logo.create({
            Id: uuid(),
            Logo: logo
        }).then(() => {
            res.status(201).json({ "msg": "Logo added successfully." });
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

// Get Logo

const getLogo = async (req, res) => {
    try {
        await Logo.findOne({
            attributes: ["Logo"]
        }).then((logo) => {
            res.status(200).send(logo);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Delete Logo

const deleteLogo = async (req, res) => {
    try {
        await Logo.truncate().then(() => {
            res.status(200).json({ "msg": "Logo deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = { addLogo, getLogo, deleteLogo }