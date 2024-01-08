const { uuid } = require("uuidv4");
const Policy = require("../models/policy");

// Add Policy

const addPolicy = async (req, res) => {
    try {
        const policy = req.body.policy;

        if (!policy) {
            return res.status(400).json({"msg": "Some field is empty."});
        }

        await Policy.create({
            Id: uuid(),
            Policy_Statement: policy
        }).then(() => {
            res.status(201).json({ "msg": "Policy added successfully." });
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

// Get Policy List

const getPolicyList = async (req, res) => {
    try {
        await Policy.findAll({
            attributes: ["Id", "Policy_Statement"]
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Update Policy

const updatePolicy = async (req, res) => {
    try {
        const {id, policy} = req.body;

        if (!(id && policy)) {
            return res.status(400).json({"msg": "Some field is empty."});
        }

        await Policy.update({
            Policy_Statement: policy
        },{
            where: {
                Id: id
            }
        }).then(() => {
            res.status(201).json({ "msg": "Policy updated successfully." });
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

// Delete Policy

const deletePolicy = async (req, res) => {
    try {
        const Id = req.params.id;

        await Policy.destroy({
            where: {
                Id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Policy deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = {addPolicy, getPolicyList, updatePolicy, deletePolicy}