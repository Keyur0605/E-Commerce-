const { uuid } = require("uuidv4");
const MainCategory = require("../models/mainCategory");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require("../models/product");
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

// Add Main Category, Category and Sub-Category

const addMainCategory = async (req, res) => {
    try {
        let { name } = req.body;
        let image = req.files.image;

        if (!name) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        let str = image.mimetype;
        let lastIndex = str.lastIndexOf("/");
        let type = str.substring(lastIndex + 1);
        var imageToSet;

        await uploadToS3(image.data, type).then((result) => {
            imageToSet = result.Location;
        });

        await MainCategory.create({
            Id: uuid(),
            Name: name,
            Image: imageToSet
        }).then(() => {
            res.status(201).json({ "msg": "Main Category added successfully." });
        }).catch((err) => {
            res.status(409).json({ "msg": "Main Category already exists." });
        });
    } catch (err) {
        res.send(err);
    }
};

const addCategory = async (req, res) => {
    try {
        let { name, mId } = req.body;

        if (!(name && mId)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        const [category, created] = await Category.findOrCreate({
            where: {
                Name: name,
                M_Id: mId
            },
            defaults: {
                Id: uuid(),
                Name: name,
                M_Id: mId
            }
        });

        if (created) {
            return res.status(201).json({ "msg": "Category added successfully." });
        }

        res.status(409).json({ "msg": "Category already exists." });
    } catch (err) {
        res.send(err);
    }
};

const addSubCategory = async (req, res) => {
    try {
        let { name, cId, mId } = req.body;
        let image = req.files.image;

        if (!(name && cId && mId)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        let str = image.mimetype;
        let lastIndex = str.lastIndexOf("/");
        let type = str.substring(lastIndex + 1);
        var imageToSet;

        await uploadToS3(image.data, type).then((result) => {
            imageToSet = result.Location;
        });

        const [subCategory, created] = await SubCategory.findOrCreate({
            where: {
                Name: name,
                C_Id: cId,
                M_Id: mId
            },
            defaults: {
                Id: uuid(),
                Name: name,
                C_Id: cId,
                M_Id: mId,
                Image: imageToSet
            }
        });

        if (created) {
            return res.status(201).json({ "msg": "Sub-Category added successfully." });
        }

        res.status(409).json({ "msg": "Sub-Category already exists." });
    } catch (err) {
        res.send(err);
    }
};

// Get Main Category, Category and Sub-Category List 

const mainCategoryList = async (req, res) => {
    try {
        await MainCategory.findAll({
            attributes: ["Id", "Name", "Image"],
            order: [["Name"]]
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const categoryList = async (req, res) => {
    try {
        await Category.findAll({
            attributes: ["Id", "Name", "M_Id"],
            order: [["Name"]]
        }).then(async (list) => {
            let listToSend = [];

            for (let i = 0; i < list.length; i++) {
                let j = list[i].dataValues;

                await MainCategory.findOne({
                    attributes: ["Name"],
                    order: [["Name"]],
                    where: {
                        Id: j.M_Id
                    }
                }).then((name) => {
                    j.M_Name = name.dataValues.Name;
                    delete j.M_Id;
                    listToSend.push(j);
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
};

const subCategoryList = async (req, res) => {
    try {
        await SubCategory.findAll({
            attributes: ["Id", "Name", "C_Id", "M_Id", "Image"],
            order: [["Name"]],
            offset: ((Number(req.params.number) - 1) * 10),
            limit: 10
        }).then(async (list) => {
            let listToSend = [];

            for (let i = 0; i < list.length; i++) {
                let j = list[i].dataValues;

                await Category.findOne({
                    attributes: ["Name"],
                    order: [["Name"]],
                    where: {
                        Id: j.C_Id
                    }
                }).then((name) => {
                    j.C_Name = name.dataValues.Name;
                    delete j.C_Id;
                }).catch((err) => {
                    return res.send(err);
                });

                await MainCategory.findOne({
                    attributes: ["Name"],
                    order: [["Name"]],
                    where: {
                        Id: j.M_Id
                    }
                }).then((name) => {
                    j.M_Name = name.dataValues.Name;
                    delete j.M_Id;
                    listToSend.push(j);
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
};

const categoryListById = async (req, res) => {
    try {
        let M_Id = req.params.mid;

        await Category.findAll({
            attributes: ["Id", "Name"],
            order: [["Name"]],
            where: {
                M_Id
            }
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const subCategoryListById = async (req, res) => {
    try {
        let M_Id = req.params.mid;
        let C_Id = req.params.cid;

        await SubCategory.findAll({
            attributes: ["Id", "Name"],
            order: [["Name"]],
            where: {
                M_Id,
                C_Id
            }
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const categoryAndSubcategoryListById = async (req, res) => {
    try {
        let M_Id = req.params.mid;

        await Category.findAll({
            attributes: ["Id", "Name"],
            order: [["Name"]],
            where: {
                M_Id
            }
        }).then(async (list) => {
            let listToSend = [];

            for (let i = 0; i < list.length; i++) {
                let j = list[i].dataValues;

                await SubCategory.findAll({
                    attributes: ["Id", "Name", "Image"],
                    order: [["Name"]],
                    where: {
                        C_Id: j.Id,
                    }
                }).then((details) => {
                    j.SubCategory = details;
                    delete j.Id;
                    listToSend.push(j);
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
};

// Update Main Category, Category and Sub-Category

const updateMainCategory = async (req, res) => {
    try {
        let { id, name } = req.body;
        let image = req.files.image;

        if (!(id && name)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        let str = image.mimetype;
        let lastIndex = str.lastIndexOf("/");
        let type = str.substring(lastIndex + 1);
        var imageToSet;

        await uploadToS3(image.data, type).then((result) => {
            imageToSet = result.Location;
        });

        await MainCategory.update({
            Name: name,
            Image: imageToSet
        }, {
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Main Category updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const updateCategory = async (req, res) => {
    try {
        let { id, name } = req.body;

        if (!(id && name)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        await Category.update({
            Name: name
        }, {
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Category updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const updateSubCategory = async (req, res) => {
    try {
        let { id, name } = req.body;
        let image = req.files.image;

        if (!(id && name)) {
            return res.status(400).json({ "msg": "Some field is empty." });
        }

        let str = image.mimetype;
        let lastIndex = str.lastIndexOf("/");
        let type = str.substring(lastIndex + 1);
        var imageToSet;

        await uploadToS3(image.data, type).then((result) => {
            imageToSet = result.Location;
        });

        await SubCategory.update({
            Name: name,
            Image: imageToSet
        }, {
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Sub-Category updated successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

// Delete Main Category, Category and Sub-Category

const deleteMainCategory = async (req, res) => {
    try {
        let id = req.params.id;

        await Product.findAll({
            attributes: ["Image"],
            where: {
                M_Id: id
            }
        }).then(async (images) => {
            if (images) {
                let imageArr = images.dataValues.Image.images;

                for (let i of imageArr) {
                    let lastIndex = i.lastIndexOf("/");
                    let name = i.substring(lastIndex + 1);
                    await deleteToS3(name).then((result) => {
                        console.log(result);
                    });
                }
            }
        }).catch((err) => {
            return res.send(err);
        });

        await SubCategory.findAll({
            attributes: ["Image"],
            where: {
                M_Id: id
            }
        }).then(async (images) => {
            if (images) {
                for (let i in images) {
                    let temp = images[i];
                    let image = temp.Image;
                    let lastIndex = image.lastIndexOf("/");
                    let name = image.substring(lastIndex + 1);
                    await deleteToS3(name).then((result) => {
                        console.log(result);
                    });
                }
            }
        }).catch((err) => {
            return res.send(err);
        });

        await MainCategory.findOne({
            attributes: ["Image"],
            where: {
                Id: id
            }
        }).then(async (image) => {
            let imageLink = image.dataValues.Image;

            let lastIndex = imageLink.lastIndexOf("/");
            let name = imageLink.substring(lastIndex + 1);
            await deleteToS3(name).then((result) => {
                console.log(result);
            });
        }).catch((err) => {
            return res.send(err);
        });

        await MainCategory.destroy({
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Main Category deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;

        await Product.findAll({
            attributes: ["Image"],
            where: {
                C_Id: id
            }
        }).then(async (images) => {
            if (images) {
                let imageArr = images.dataValues.Image.images;

                for (let i of imageArr) {
                    let lastIndex = i.lastIndexOf("/");
                    let name = i.substring(lastIndex + 1);
                    await deleteToS3(name).then((result) => {
                        console.log(result);
                    });
                }
            }
        }).catch((err) => {
            return res.send(err);
        });

        await SubCategory.findAll({
            attributes: ["Image"],
            where: {
                C_Id: id
            }
        }).then(async (images) => {
            if (images) {
                for (let i in images) {
                    let temp = images[i];
                    let imageLink = temp.Image;
                    let lastIndex = imageLink.lastIndexOf("/");
                    let name = imageLink.substring(lastIndex + 1);
                    await deleteToS3(name).then((result) => {
                        console.log(result);
                    });
                }
            }
        }).catch((err) => {
            return res.send(err);
        });

        await Category.destroy({
            where: {
                Id: id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Category deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        await Product.findAll({
            attributes: ["Image"],
            where: {
                S_Id: req.params.id
            }
        }).then(async (images) => {
            if (images) {
                let imageArr = images.dataValues.Image.images;

                for (let i of imageArr) {
                    let lastIndex = i.lastIndexOf("/");
                    let name = i.substring(lastIndex + 1);
                    await deleteToS3(name).then((result) => {
                        console.log(result);
                    });
                }
            }
        }).catch((err) => {
            return res.send(err);
        });

        await SubCategory.findOne({
            attributes: ["Image"],
            where: {
                Id: req.params.id
            }
        }).then(async (image) => {
            let imageLink = image.dataValues.Image;

            let lastIndex = imageLink.lastIndexOf("/");
            let name = imageLink.substring(lastIndex + 1);
            await deleteToS3(name).then((result) => {
                console.log(result);
            });
        }).catch((err) => {
            return res.send(err);
        });

        await SubCategory.destroy({
            where: {
                Id: req.params.id
            }
        }).then(() => {
            res.status(200).json({ "msg": "Sub-Category deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = { addMainCategory, addCategory, addSubCategory, mainCategoryList, categoryList, subCategoryList, categoryListById, subCategoryListById, categoryAndSubcategoryListById, updateMainCategory, updateCategory, updateSubCategory, deleteMainCategory, deleteCategory, deleteSubCategory }