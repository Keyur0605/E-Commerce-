const { uuid } = require("uuidv4");
const Contact = require("../models/contact");

// Add Contact Details

const addContactDetails = async (req, res) => {
    try {
        const { mobile, email, address } = req.body;

        if (!(mobile && email && address)) {
            return res.status(400).json({"msg": "Some field is empty."});
        }

        await Contact.create({
            Id: uuid(),
            Mobile: mobile,
            Email: email,
            Address: address
        }).then(() => {
            res.status(201).json({ "msg": "Contact details added successfully." });
        }).catch((err) => {
            if(err.errors[0].type == "Validation error"){
                return res.status(409).json({ "msg": "Email is invalid." });
            }

            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Get Contact Details

const getContactDetails = async (req, res) => {
    try {
        await Contact.findAll({
            attributes: ["Id", "Mobile", "Email", "Address"]
        }).then((details) => {
            res.status(200).send(details);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Update Contact Details

const updateContactDetails = async (req, res) => {
    try {
        const { id, mobile, email, address } = req.body;

        if (!(id && mobile && email && address)) {
            return res.status(400).json({"msg": "Some field is empty."});
        }
        console.log(mobile);
        await Contact.update({
            Mobile: mobile,
            Email: email,
            Address: address
        },{
            where: {
                Id: id
            }
        }).then(async (response) => {
            console.log(response);
            await Contact.findOne({
                where: {
                    Id: id
                }
            }).then((details) => {
                console.log(details.dataValues);
            })
            res.status(200).json({ "msg": "Contact details updated successfully." });
        }).catch((err) => {
            if(err.errors[0].type == "Validation error"){
                return res.status(409).json({ "msg": "Email is invalid." });
            }

            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

module.exports = {addContactDetails, getContactDetails, updateContactDetails}