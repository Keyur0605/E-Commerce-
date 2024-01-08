const { uuid } = require("uuidv4");
const Banner = require("../models/banner");
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

// Add Banner Image

const addBannerImage = async (req, res) => {
    try {
        let {sale} = req.body;
        let image = req.files.image;
        
        if (!sale) {
            return res.status(400).json({ "msg": "Some field is empty." });
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

        for (let i in imagePath) {
            await Banner.create({
                Id: uuid(),
                Image: imagePath[i],
                Sale: sale
            });

            if (i == (imagePath.length - 1)) {
                res.status(201).json({ "msg": "Banner added successfully." });
            }
        }
    } catch (err) {
        res.send(err);
    }
};

// Get Banner Image

const getBannerImage = async (req, res) => {
    try {
        await Banner.findAll({
            attributes: ["Id", "Image", "Sale"]
        }).then((list) => {
            res.status(200).send(list);
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        res.send(err);
    }
};

// Delete Banner Image By Id

const deleteBannerImageById = async (req, res) => {
    try {
        const Id = req.params.id;

        await Banner.findOne({
            attributes: ["Image"],
            where: {
                Id
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

        await Banner.destroy({
            where: {
                Id
            }
        }).then(() => {
            return res.status(200).json({ "msg": "Banner deleted successfully." });
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = { addBannerImage, getBannerImage, deleteBannerImageById }