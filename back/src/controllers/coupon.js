const { uuid } = require("uuidv4");
const { Op } = require("sequelize");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

// Add coupon

const addCoupon = async (req, res) => {
    try {
        let { couponCode, discription, discount, minCartValue } = req.body;

        if (!(couponCode && discription && discount && minCartValue)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        const [dis, created] = await Coupon.findOrCreate({
            where: {
                [Op.or]: [{ Coupon_Code: couponCode }, { Discount: discount }]
            },
            defaults: {
                Id: uuid(),
                Coupon_Code: couponCode,
                Discription: discription,
                Discount: discount,
                Min_Cart_Value: minCartValue
            }
        });

        if (created) {
            return res.status(201).json({ "msg": "Coupon added successfully." });
        }

        res.status(409).json({ "msg": "Coupon/Discount with same value already exists." });
    } catch (err) {
        res.send(err);
    }
}

// Get coupon list

const couponListAdmin = async (req, res) => {
    try {
        await Coupon.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            order: [["createdAt", "DESC"]]
        }).then((list) => {
            return res.status(200).send(list);
        }).catch((err) => {
            return res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

const couponList = async (req, res) => {
    try {
        let amount = req.params.amount;

        await Order.findAll({
            attributes: ["Discount_Coupon"],
            where: {
                U_Id: req.user.Id
            }
        }).then(async (couponList) => {
            if (couponList.length > 0) {
                let coupons = [];

                for (let i of couponList) {
                    coupons.push(i.dataValues.Discount_Coupon);
                }

                await Coupon.findAll({
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        Min_Cart_Value: {
                            [Op.lte]: amount
                        },
                        Coupon_Code: {
                            [Op.notIn]: coupons
                        }
                    }
                }).then((list) => {
                    return res.status(200).send(list);
                }).catch((err) => {
                    return res.send(err);
                });
            } else {
                await Coupon.findAll({
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        Min_Cart_Value: {
                            [Op.lte]: amount
                        }
                    }
                }).then((list) => {
                    return res.status(200).send(list);
                }).catch((err) => {
                    return res.send(err);
                });
            }
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

// Delete coupon

const deleteCoupon = async (req, res) => {
    try {
        await Coupon.destroy({
            where: {
                Id: req.params.id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Coupon deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports = { addCoupon, couponListAdmin, couponList, deleteCoupon }