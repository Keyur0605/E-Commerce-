const { uuid } = require("uuidv4");
const Product = require("../models/product");
const Cart = require("../models/cart");

// Add to cart

const addToCart = async (req, res) => {
    try {
        let { id, sizeQuantity } = req.body;

        if (!(id && sizeQuantity)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        let size = Object.keys(sizeQuantity);
        let quantity = Object.values(sizeQuantity);

        await Cart.findAll({
            attributes: ["Id", "Size_Quantity"],
            where: {
                U_Id: req.user.Id,
                P_Id: id
            }
        }).then(async (list) => {
            if(list){
                for(let i of list){
                    let j = Object.keys(i.Size_Quantity);
                    if(j[0] == size[0]){
                        return res.status(200).json({ "msg": "Product with this size is already added."})
                    }
                }
            }
            
            await Product.findOne({
                attributes: ["Price", "Size_Quantity"],
                where: {
                    Id: id
                }
            }).then(async (details) => {
                let sizeQuantityToUpdate = details.dataValues.Size_Quantity;

                for (let i in sizeQuantityToUpdate) {
                    if (i == size[0]) {
                        sizeQuantityToUpdate[i] = sizeQuantityToUpdate[i] - quantity[0];
                    }
                }

                await Product.update({
                    Size_Quantity: sizeQuantityToUpdate
                }, {
                    where: {
                        Id: id
                    }
                }).then(async () => {
                    await Cart.create({
                        Id: uuid(),
                        U_Id: req.user.Id,
                        P_Id: id,
                        Size_Quantity: sizeQuantity
                    }).then(() => {
                        res.status(201).json({ "msg": "Product added successfully." });
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

// Get cart list

const cartList = async (req, res) => {
    try {
        await Cart.findAll({
            attributes: ["Id", "P_Id", "Size_Quantity"],
            where: {
                U_Id: req.user.Id
            }
        }).then(async (list) => {
            let listToSend = [];

            for (let i in list) {
                let j = list[i].dataValues;

                await Product.findOne({
                    attributes: ["Name", "Image", "Brand", "Price", "Size_Quantity"],
                    where: {
                        Id: j.P_Id
                    }
                }).then((details) => {
                    if(details){
                        j.Name = details.dataValues.Name;
                        j.Image = details.dataValues.Image;
                        j.Brand = details.dataValues.Brand;
                        j.Quantity = Object.values(j.Size_Quantity)[0];
                        j.Total_Size_Quantity = details.dataValues.Size_Quantity;
                        j.Price = details.dataValues.Price;
    
                        listToSend.push(j);
                    }
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

// Update Quantity

const updateQuantity = async (req, res) => {
    try {
        let {id, sizeQuantity} = req.body;

        await Cart.findOne({
            attributes: ["P_Id", "Size_Quantity"],
            where: {
                Id: id
            }
        }).then(async (details) => {
            let size = Object.keys(details.dataValues.Size_Quantity);
            let quantity = Object.values(details.dataValues.Size_Quantity);

            await Product.findOne({
                attributes: ["Size_Quantity"],
                where: {
                    Id: details.dataValues.P_Id
                }
            }).then(async (sizeQuantityDetail) => {
                let sizeQuantityToUpdate = sizeQuantityDetail.dataValues.Size_Quantity;

                for (let i in sizeQuantityToUpdate) {
                    if (i == size[0]) {
                        let diff = sizeQuantity[i] - quantity[0];
                        sizeQuantityToUpdate[i] = sizeQuantityToUpdate[i] - (diff);
                    }
                }

                await Product.update({
                    Size_Quantity: sizeQuantityToUpdate
                }, {
                    where: {
                        Id: details.dataValues.P_Id
                    }
                }).then(async () => {
                    await Cart.update({
                        Size_Quantity: sizeQuantity
                    },{
                        where: {
                            Id: id
                        }
                    }).then(() => {
                        res.status(200).json({ "msg": "Quantity updated successfully." });
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

// Delete cart item

const deleteCartItem = async (req, res) => {
    try {
        let Id = req.params.id;

        await Cart.findOne({
            attributes: ["P_Id", "Size_Quantity"],
            where: {
                Id
            }
        }).then(async (details) => {
            let size = Object.keys(details.dataValues.Size_Quantity);
            let quantity = Object.values(details.dataValues.Size_Quantity);

            await Product.findOne({
                attributes: ["Size_Quantity"],
                where: {
                    Id: details.dataValues.P_Id
                }
            }).then(async (sizeQuantityDetail) => {
                let sizeQuantityToUpdate = sizeQuantityDetail.dataValues.Size_Quantity;

                for (let i in sizeQuantityToUpdate) {
                    if (i == size[0]) {
                        sizeQuantityToUpdate[i] = sizeQuantityToUpdate[i] + quantity[0];
                    }
                }

                await Product.update({
                    Size_Quantity: sizeQuantityToUpdate
                }, {
                    where: {
                        Id: details.dataValues.P_Id
                    }
                }).then(async () => {
                    await Cart.destroy({
                        where: {
                            Id
                        }
                    }).then(() => {
                        res.status(200).json({ "msg": "Product deleted successfully." });
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

module.exports = { addToCart, cartList, updateQuantity, deleteCartItem }