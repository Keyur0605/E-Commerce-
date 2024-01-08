const Product = require("../models/product");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

// Get Order Item List

const getOrderItemListAdmin = async (req, res) => {
    try {
        await Order.findOne({
            attributes: ["OI_Id", "Order_Status", "Delivery_Date"],
            where: {
                Id: req.params.id
            }
        }).then(async (details) => {
            let temp = details.dataValues;
            let listToSend = [];

            for (let i of temp.OI_Id.orderItemId) {
                await OrderItem.findOne({
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        Id: i
                    }
                }).then(async (details) => {
                    let j = details.dataValues;

                    await Product.findOne({
                        attributes: ["Name", "Image", "Brand"],
                        where: {
                            Id: j.P_Id
                        }
                    }).then((details) => {
                        if (details) {
                            let productDetails = details.dataValues;

                            j.Name = productDetails.Name;
                            j.Image = productDetails.Image;
                            j.Brand = productDetails.Brand;
                            j.Quantity = Object.values(j.Size_Quantity)[0];
                            j.Cancel_Status = false;
                            j.Return_Status = false;

                            if (temp.Order_Status == "Pending") {
                                j.Cancel_Status = true;
                            }

                            if (temp.Order_Status == "Delivered") {
                                j.Return_Status = true;
                            }

                            listToSend.push(j);
                        }
                    }).catch((err) => {
                        return res.send(err);
                    });
                }).catch((err) => {
                    return res.send(err);
                });
            }

            res.status(200).send(listToSend);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

const getOrderItemList = async (req, res) => {
    try {
        let listToSend = [];

        await Order.findAll({
            attributes: ["O_Number", "OI_Id", "Order_Status", "Delivery_Date"],
            where: {
                U_Id: req.user.Id
            },
            order: [["createdAt", "DESC"]],
        }).then(async (list) => {
            if (list.length > 0) {
                for (let i of list) {
                    let temp = i.dataValues;
                    let orderItemIdList = temp.OI_Id.orderItemId;

                    for (let j of orderItemIdList) {
                        await OrderItem.findOne({
                            attributes: { exclude: ["Quantity", "createdAt", "updatedAt"] },
                            where: {
                                Id: j
                            }
                        }).then(async (details) => {
                            let temp2 = details.dataValues;

                            await Product.findOne({
                                attributes: ["Name", "Image", "Brand"],
                                where: {
                                    Id: temp2.P_Id
                                }
                            }).then((details) => {
                                if (details) {
                                    let productDetails = details.dataValues;

                                    temp2.Name = productDetails.Name;
                                    temp2.Image = productDetails.Image;
                                    temp2.Brand = productDetails.Brand;
                                    temp2.OrderNumber = temp.O_Number;
                                    temp2.Status = temp.Order_Status;
                                    temp2.Delivery_Date = temp.Delivery_Date;

                                    if(temp.Order_Status != "Delivered"){
                                        temp2.Delivery_Date = "None"
                                    }

                                    listToSend.push(temp2);
                                }
                            }).catch((err) => {
                                return res.send(err);
                            });
                        }).catch((err) => {
                            return res.send(err);
                        });
                    }
                }

                res.status(200).send(listToSend);
            } else {
                res.status(200).send(listToSend);
            }
        });
    } catch (err) {
        res.send(err);
    }
}

// Update Order Item Quantity

const updateOrderItemQuantity = async (req, res) => {
    try {
        let { oId, id, quantity } = req.body;

        if (!(oId && id && quantity)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await OrderItem.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                Id: id
            }
        }).then(async (details) => {
            let temp = details.dataValues;
            let diff;

            await Product.findOne({
                attributes: ["Size_Quantity"],
                where: {
                    Id: temp.P_Id
                }
            }).then(async (sizeQuantityDetail) => {
                let sizeQuantityToUpdate = sizeQuantityDetail.dataValues.Size_Quantity;

                for (let i in sizeQuantityToUpdate) {
                    if (i == Object.keys(temp.Size_Quantity)[0]) {
                        diff = temp.Quantity - quantity;
                        sizeQuantityToUpdate[i] = sizeQuantityToUpdate[i] + diff;
                    }
                }

                await Product.update({
                    Size_Quantity: sizeQuantityToUpdate
                }, {
                    where: {
                        Id: details.dataValues.P_Id
                    }
                }).then(async () => {
                    let sizeQuantityToUpdate = {};
                    let size = Object.keys(temp.Size_Quantity)[0];
                    sizeQuantityToUpdate[size] = quantity;
                    let price = Math.floor((temp.T_Price / temp.Quantity) * diff);

                    await OrderItem.update({
                        Size_Quantity: sizeQuantityToUpdate,
                        Quantity: quantity,
                        T_Price: temp.T_Price - price
                    }, {
                        where: {
                            Id: id
                        }
                    }).then(async () => {
                        await Order.findOne({
                            attributes: ["T_Price", "Payment_Status", "Due_Refund_Amount", "Total_Refund_Amount"],
                            where: {
                                Id: oId
                            }
                        }).then(async (details) => {
                            let temp2 = details.dataValues;
                            let update;

                            if (temp2.Payment_Status == "Paid") {
                                update = {
                                    Due_Refund_Amount: temp2.Due_Refund_Amount + price,
                                    Total_Refund_Amount: temp2.Total_Refund_Amount + price,
                                    Refund_Status: "Unpaid"
                                }
                            }

                            if (temp2.Payment_Status == "Pending") {
                                update = {
                                    T_Price: temp2.T_Price - price
                                }
                            }

                            await Order.update(update, {
                                where: {
                                    Id: oId
                                }
                            }).then(() => {
                                return res.status(200).json({ "msg": "Order item updated successfully." });
                            }).catch((err) => {
                                return res.send(err);
                            });
                        }).catch((err) => {
                            return res.send(err);
                        });
                    }).catch((err) => {
                        return res.send(err);
                    });
                }).catch((err) => {
                    return res.send(err);
                });
            }).catch((err) => {
                return res.send(err);
            });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

// Delete Order Item

const deleteOrderItem = async (req, res) => {
    try {
        let { oId, id } = req.params;

        await OrderItem.findOne({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
                Id: id
            }
        }).then(async (details) => {
            let temp = details.dataValues;

            await Product.findOne({
                attributes: ["Size_Quantity"],
                where: {
                    Id: temp.P_Id
                }
            }).then(async (sizeQuantityDetail) => {
                let sizeQuantityToUpdate = sizeQuantityDetail.dataValues.Size_Quantity;

                for (let i in sizeQuantityToUpdate) {
                    if (i == Object.keys(temp.Size_Quantity)[0]) {
                        sizeQuantityToUpdate[i] = sizeQuantityToUpdate[i] + temp.Quantity;
                    }
                }

                await Product.update({
                    Size_Quantity: sizeQuantityToUpdate
                }, {
                    where: {
                        Id: temp.P_Id
                    }
                }).then(async () => {
                    await OrderItem.destroy({
                        where: {
                            Id: id
                        }
                    }).then(async () => {
                        await Order.findOne({
                            attributes: ["OI_Id", "T_Price", "Payment_Status", "Due_Refund_Amount", "Total_Refund_Amount"],
                            where: {
                                Id: oId
                            }
                        }).then(async (details) => {
                            let temp2 = details.dataValues;
                            let orderItemIdList = temp2.OI_Id.orderItemId;
                            let index = orderItemIdList.indexOf(id);
                            orderItemIdList.splice(index, 1);
                            let orderItemIdListToUpdate = { "orderItemId": orderItemIdList };

                            let update;

                            if (temp2.Payment_Status == "Paid") {
                                if(orderItemIdList.length == 0){
                                    update = {
                                        OI_Id: orderItemIdListToUpdate,
                                        Due_Refund_Amount: temp2.Due_Refund_Amount + temp.T_Price,
                                        Total_Refund_Amount: temp2.Total_Refund_Amount + temp.T_Price,
                                        Refund_Status: "Unpaid",
                                        Order_Status: "Canceled"
                                    }
                                }else{
                                    update = {
                                        OI_Id: orderItemIdListToUpdate,
                                        Due_Refund_Amount: temp2.Due_Refund_Amount + temp.T_Price,
                                        Total_Refund_Amount: temp2.Total_Refund_Amount + temp.T_Price,
                                        Refund_Status: "Unpaid"
                                    }
                                }
                            }

                            if (temp2.Payment_Status == "Pending") {
                                if(temp2.T_Price - temp.T_Price == 0){
                                    update = {
                                        OI_Id: orderItemIdListToUpdate,
                                        T_Price: temp2.T_Price - temp.T_Price,
                                        Order_Status: "Canceled",
                                        Payment_Status: "None"
                                    }
                                }else{
                                    update = {
                                        OI_Id: orderItemIdListToUpdate,
                                        T_Price: temp2.T_Price - temp.T_Price
                                    }
                                }
                            }

                            await Order.update(update, {
                                where: {
                                    Id: oId
                                }
                            }).then(() => {
                                return res.status(200).json({ "msg": "Order item deleted successfully." });
                            }).catch((err) => {
                                return res.send(err);
                            });
                        }).catch((err) => {
                            return res.send(err);
                        });
                    }).catch((err) => {
                        return res.send(err);
                    });
                }).catch((err) => {
                    return res.send(err);
                });
            }).catch((err) => {
                return res.send(err);
            });
        }).catch((err) => {
            res.send(err);
        });
    } catch {
        res.send(err);
    }
}

module.exports = { getOrderItemListAdmin, getOrderItemList, updateOrderItemQuantity, deleteOrderItem }