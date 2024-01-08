const { Op, QueryTypes } = require("sequelize");
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const Wishlist = require("../models/wishlist");
const sequelize = require("../db/conn");
const aws = require("aws-sdk");

// AWS Configure

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const S3 = new aws.S3(awsConfig);

// Function to upload and delete image

const uploadToS3 = (bufferData, type) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now().toString()}.${type}`,
            Body: bufferData
        };

        S3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }

            return resolve(data);
        })
    })
}

const deleteToS3 = (name) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: name,
        };

        S3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err);
            }

            return resolve(data);
        })
    })
}

// Add Product

const addProduct = async (req, res) => {
    try {
        let { name, brand, description, sizeQuantity, price, sPrice, attributes, mId, cId, sId, active, sale } = req.body;
        let image = req.files.image;

        if (!(name && brand && description && sizeQuantity && price && sPrice && attributes && mId && cId && sId)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        sizeQuantity = JSON.parse(req.body.sizeQuantity);
        let sizeQuantityToAdd = {};

        for (let i of sizeQuantity) {
            let k = Object.keys(i);
            let v = Object.values(i);
            sizeQuantityToAdd[k[0]] = Number(v[0]);
        }

        var imagePath = [];

        for (let i of image) {
            let str = i.mimetype;
            let lastIndex = str.lastIndexOf("/");
            let type = str.substring(lastIndex + 1);
            await uploadToS3(i.data, type).then((result) => {
                imagePath.push(result.Location);
            });
        }

        await Product.create({
            Id: uuid(),
            Name: name,
            Image: { "images": imagePath },
            Brand: brand,
            Description: description,
            Size_Quantity: sizeQuantityToAdd,
            Price: price,
            S_Price: sPrice,
            Attributes: JSON.parse(attributes),
            M_Id: mId,
            C_Id: cId,
            S_Id: sId,
            Active: active,
            Sale: sale
        }).then(() => {
            res.status(201).json({ "msg": "Product added successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Get Product List

const productList = async (req, res) => {
    try {
        await Product.findAll({
            attributes: ["Id", "Name", "Image", "Brand", "Price", "S_Price", "Active", "Sale", "Size_Quantity"],
            order: [["createdAt", "DESC"]],
            offset: ((Number(req.params.number) - 1) * 15),
            limit: 15
        }).then(async (list) => {
            let brandList = [];

            if (list.length > 0) {
                await Product.findAll({
                    attributes: ["Brand"],
                    group: ["Brand"]
                }).then((brand) => {
                    for (let i of brand) {
                        brandList.push(i.Brand);
                    }

                    res.status(200).json({ brandList, "productList": list });
                }).catch((err) => {
                    res.send(err);
                });
            } else {
                res.status(200).json({ brandList, "productList": list });
            }
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const filterProductListAdmin = async (req, res) => {
    try {
        let where = {};

        if (req.query.hasOwnProperty("brand")) {
            if (req.query.brand.indexOf(",") != -1) {
                where["Brand"] = { [Op.in]: req.query.brand.split(",") };
            } else {
                where["Brand"] = req.query.brand;
            }
        }

        if (req.query.hasOwnProperty("active")) {
            where["Active"] = req.query.active;
        }

        if (req.query.hasOwnProperty("sale")) {
            where["Sale"] = req.query.sale;
        }

        await Product.findAll({
            attributes: ["Id", "Name", "Image", "Brand", "Price", "S_Price", "Active", "Sale", "Size_Quantity"],
            where,
            order: [["createdAt", "DESC"]],
            offset: ((Number(req.params.number) - 1) * 15),
            limit: 15
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

const productListById = async (req, res) => {
    try {
        const id = req.params.id;
        const token = req.header("Authorization");

        await Product.findAll({
            attributes: ["Id", "Name", "Image", "Brand", "Price", "S_Price", "Wishlist_Status", "Sale", "Attributes"],
            where: {
                [Op.or]: {
                    M_Id: id,
                    S_Id: id
                },
                Active: true
            },
            order: [["createdAt", "DESC"]],
            offset: ((Number(req.params.number) - 1) * 15),
            limit: 15
        }).then(async (list) => {
            let attributesObject = {};
            let listToSend = [];

            if (list.length > 0) {
                let attributesGroupList = Object.keys(list[0].dataValues.Attributes);

                for (let i of attributesGroupList) {
                    attributesObject[i] = [];
                }

                for (let i of list) {
                    let tempObject = i.dataValues.Attributes;

                    for (let j in tempObject) {
                        attributesObject[j] = [...attributesObject[j], tempObject[j]];
                    }
                }

                for (let i in attributesObject) {
                    let temp = attributesObject[i];
                    if (i == "Size") {
                        temp = temp.flat();
                    }
                    temp = new Set(temp);
                    temp = [...temp]
                    attributesObject[i] = temp;
                }

                if (token != "nToken") {
                    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

                    if (verifyUser) {
                        await Wishlist.findOne({
                            attributes: ["P_Id"],
                            where: {
                                U_Id: verifyUser.Id
                            }
                        }).then(async (pId) => {
                            if (pId) {
                                let listOfId = pId.dataValues.P_Id.products;

                                for (let i in list) {
                                    let temp = list[i].dataValues;
                                    let id = temp.Id;

                                    if (listOfId.includes(id)) {
                                        temp.Wishlist_Status = true;
                                    }

                                    listToSend.push(temp);
                                }

                                res.status(200).json({ attributesObject, listToSend });
                            } else {
                                res.status(200).json({ attributesObject, "listToSend": list });
                            }
                        }).catch((err) => {
                            return res.send(err)
                        });
                    } else {
                        res.status(200).json({ "msg": "Please login again." });
                    }
                } else {
                    res.status(200).json({ attributesObject, "listToSend": list });
                }
            } else {
                res.status(200).json({ attributesObject, listToSend });
            }
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const filterProductList = async (req, res) => {
    try {
        let query = req.query;
        const id = req.params.id;
        const number = req.params.number;
        const token = req.header("Authorization");
        let queryKeys = Object.keys(query);
        let queryValues = Object.values(query);

        let sql = `SELECT Id, Name, Image, Brand, Price, S_Price, Wishlist_Status, Sale FROM Products AS Product WHERE (Product.M_Id = "${id}" OR Product.S_Id = "${id}") AND Product.Active = true`;

        let attributesObject = {};

        for (let i of queryKeys) {
            if (i == "Min" || i == "Max") {
                continue;
            }
            attributesObject[i] = [];
        }

        let price = { "Min": 0, "Max": 0 };

        for (let i in queryKeys) {
            if (queryKeys[i] == "Min" || queryKeys[i] == "Max") {
                price[queryKeys[i]] = queryValues[i];
            } else {
                for (let k in attributesObject) {
                    if (k == queryKeys[i]) {
                        let temp = attributesObject[k];
                        if (queryValues[i].indexOf(",") != -1) {
                            let arrString = queryValues[i].split(",");
                            temp = [...arrString];
                        } else {
                            temp.push(queryValues[i]);
                        }
                        attributesObject[k] = temp;
                    }
                }
            }
        }

        for (let i in attributesObject) {
            let temp = attributesObject[i];

            if (i != "Size") {
                if (temp.length > 1) {
                    for (let j in temp) {
                        if (j == 0) {
                            sql += " AND (";
                        }
                        sql += `JSON_UNQUOTE(JSON_EXTRACT(Product.Attributes, "$.${i}")) = "${temp[j]}"`;
                        if (j != (temp.length - 1)) {
                            sql += " OR ";
                        }
                        if (j == (temp.length - 1)) {
                            sql += ") ";
                        }
                    }
                } else {
                    sql += ` AND JSON_UNQUOTE(JSON_EXTRACT(Product.Attributes, "$.${i}")) = "${temp[0]}"`;
                }
            } else {
                if (temp.length > 1) {
                    for (let j in temp) {
                        if (j == 0) {
                            sql += " AND (";
                        }
                        sql += `JSON_SEARCH(Product.Attributes, "one", \"${temp[j]}\", NULL, "$.${i}") IS NOT NULL`;
                        if (j != (temp.length - 1)) {
                            sql += " OR ";
                        }
                        if (j == (temp.length - 1)) {
                            sql += ") ";
                        }
                    }
                } else {
                    sql += ` AND JSON_SEARCH(Product.Attributes, "one", \"${temp[0]}\", NULL, "$.${i}") IS NOT NULL`;
                }
            }
        }

        sql += ` AND Product.Price BETWEEN ${price["Min"]} AND ${price["Max"]} ORDER BY createdAt DESC LIMIT 15 OFFSET ${((Number(number) - 1) * 15)}`;

        await sequelize.query(sql, { type: QueryTypes.SELECT }).then(async (list) => {
            let listToSend = [];

            if (list.length > 0) {
                if (token != "nToken") {
                    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

                    if (verifyUser) {
                        await Wishlist.findOne({
                            attributes: ["P_Id"],
                            where: {
                                U_Id: verifyUser.Id
                            }
                        }).then(async (pId) => {
                            if (pId) {
                                let listOfId = pId.dataValues.P_Id.products;

                                for (let i in list) {
                                    let temp = list[i];
                                    let id = temp.Id;
                                    let exists = listOfId.includes(id);

                                    if (exists) {
                                        temp.Wishlist_Status = true;
                                    }

                                    listToSend.push(temp);
                                }

                                res.status(200).send(listToSend);
                            } else {
                                res.status(200).json({ "listToSend": list });
                            }
                        }).catch((err) => {
                            return res.send(err);
                        });
                    } else {
                        res.status(200).json({ "msg": "Please login again." });
                    }
                }
            } else {
                res.status(200).send(listToSend);
            }
        }).catch((err) => {
            res.send(err);
        });

        // if (token != "nToken") {
        //     let listOfId;
        //     const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //     await Wishlist.findOne({
        //         attributes: ["P_Id"],
        //         where: {
        //             U_Id: verifyUser.Id
        //         }
        //     }).then(async (pId) => {
        //         if (pId) {
        //             listOfId = pId.dataValues.P_Id.products;

        //             const sql = sqlGenerator(id, queryKeys, queryValues, number);

        //             await sequelize.query(sql, { type: QueryTypes.SELECT }).then((list) => {
        //                 let listToSend = [];

        //                 for (let i in list) {
        //                     let temp = list[i];
        //                     let id = temp.Id;
        //                     let exists = listOfId.includes(id);

        //                     if (exists) {
        //                         temp.Wishlist_Status = true;
        //                     }

        //                     listToSend.push(temp);
        //                 }

        //                 res.status(200).send(listToSend);
        //             }).catch((err) => {
        //                 res.send(err);
        //             });
        //         } else {
        //             let sql = sqlGenerator(id, queryKeys, queryValues, number);

        //             await sequelize.query(sql, { type: QueryTypes.SELECT }).then((list) => {
        //                 res.status(200).send(list);
        //             }).catch((err) => {
        //                 res.send(err);
        //             });
        //         }
        //     }).catch((err) => {
        //         res.send(err);
        //     });
        // } else {
        //     let sql = sqlGenerator(id, queryKeys, queryValues, number);

        //     await sequelize.query(sql, { type: QueryTypes.SELECT }).then((list) => {
        //         res.status(200).send(list);
        //     }).catch((err) => {
        //         res.send(err);
        //     });
        // }
    } catch (err) {
        res.send(err);
    }
};

const productById = async (req, res) => {
    try {
        const id = req.params.id;
        const token = req.header("Authorization");

        await Product.findOne({
            attributes: ["Id", "Name", "Image", "Brand", "Description", "Size_Quantity", "Price", "S_Price", "Attributes", "Wishlist_Status", "Sale"],
            where: {
                Id: id,
                Active: true
            }
        }).then(async (details) => {
            if (token != "nToken") {
                const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

                if (verifyUser) {
                    await Wishlist.findOne({
                        attributes: ["P_Id"],
                        where: {
                            U_Id: verifyUser.Id
                        }
                    }).then(async (pId) => {
                        if (pId) {
                            let listOfId = pId.dataValues.P_Id.products;
                            let product = details.dataValues;
                            let id = product.Id;
                            let exists = listOfId.includes(id);

                            if (exists) {
                                product.Wishlist_Status = 1;
                            }

                            res.status(200).json({product});
                        } else {
                            res.status(200).json({"product": details});
                        }
                    }).catch((err) => {
                        return res.send(err);
                    });
                } else {
                    res.status(200).json({ "msg": "Please login again." });
                }
            } else {
                res.status(200).json({"product": details});
            }
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Active Product

const activeProduct = async (req, res) => {
    try {
        const { id, active } = req.body;

        if (!id) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await Product.update({
            Active: active
        }, {
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Product status updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Sale Product

const saleProduct = async (req, res) => {
    try {
        const { id, sale } = req.body;

        if (!id) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await Product.update({
            Sale: sale
        }, {
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Product status updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Update Product

const updateProduct = async (req, res) => { 
    try {
        let { id, name, description, sizeQuantity, price, sPrice } = req.body;

        if (!(id && name && description && sizeQuantity && price && sPrice)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await Product.update({
            Name: name,
            Description: description,
            Size_Quantity: sizeQuantity,
            Price: price,
            S_Price: sPrice
        }, {
            where: {
                Id: id
            }
        }).then((data) => {
            console.log(data);
            res.status(200).json({ "msg": "Product updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Delete Product

const deleteProduct = async (req, res) => {
    try {
        const Id = req.params.id;

        await Product.findOne({
            attributes: ["Image"],
            where: {
                Id
            }
        }).then(async (image) => {
            let imageLink = image.dataValues.Image.images;

            for (let i of imageLink) {
                let lastIndex = i.lastIndexOf("/");
                let name = i.substring(lastIndex + 1);
                await deleteToS3(name).then((result) => {
                    console.log(result);
                });
            }
        }).catch((err) => {
            return res.send(err);
        });

        await Product.destroy({
            where: {
                Id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Product deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = { addProduct, productList, filterProductListAdmin, productListById, filterProductList, productById, activeProduct, saleProduct, updateProduct, deleteProduct } 