const { uuid } = require("uuidv4");
const Attribute = require("../models/attribute");

// Add Attribute

const addAttribute = async (req, res) => {
    try {
        const { name, g_name } = req.body;

        if (!(name && g_name)) {
            return res.status(400).json({"msg": "Some field is empty."});
        }

        await Attribute.create({
            Id: uuid(),
            Name: name,
            G_Name: g_name
        }).then(() => {
            res.status(201).json({ "msg": "Attribute added successfully." })
        }).catch((err) => {
            res.status(409).json({ "msg": "Attribute already exists." });
        })
    } catch (err) {
        res.send(err);
    }
};

// Get Attribute List

const getAttributesGroupList = async (req, res) => {
    try {
        await Attribute.findAll({
            attributes: ["G_Name"],
            group: ["G_Name"]
        }).then((list) => {
            let listToSend = [];

            for (let i in list){
                let value = Object.values(list[i].dataValues);
                let v = value[0];

                listToSend.push(v);
            }

            res.status(200).send(listToSend);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const getAttributesList = async (req, res) => {
    try {
        await Attribute.findAll({
            attributes: ["Id", "Name", "G_Name"],
            order: [["G_Name"], ["Name"]]
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const getListByName = async (req, res) => {
    try {
        const G_Name = req.params.name;

        await Attribute.findAll({
            attributes: ["Name"],
            order: [["Name"]],
            where: {
                G_Name
            }
        }).then((list) => {
            let listToSend = [];

            for (let i in list){
                let value = Object.values(list[i].dataValues);
                listToSend.push(value[0]);
            }

            res.status(200).send(listToSend);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Delete Attribute

const deleteAttribute = async (req, res) => {
    try {
        await Attribute.destroy({
            where: {
                Id: req.params.id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Attribute deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = { addAttribute, getAttributesGroupList, getAttributesList, getListByName, deleteAttribute }