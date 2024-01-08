const sequelize = require("../db/conn");
const Order = require("../models/order");

const countOrders = async (type) => {
    let temp = 0;
    await Order.findAll({
        attributes: [[sequelize.fn("COUNT", sequelize.col("Id")), "T_Order"]],
        where: type
    }).then((totalOrders) => {
        if(totalOrders != null){
            temp = totalOrders[0].dataValues.T_Order;
        }
    }).catch((err) => {
        return err
    });

    return temp
}

const statistics = async (req, res) => {
    try {
        await Order.findAll({
            attributes: [[sequelize.fn("COUNT", sequelize.col("Id")), "N_Order"]]
        }).then(async (tOrders) => {
            let {totalOrders, acceptedOrders, deliveredOrders, canceledOrders, unpaidOrders, paidOrders} = 0;
            let totalRefunds = 0;
            let totalPayments = 0;



            if(tOrders != null){
                totalOrders = tOrders[0].dataValues.N_Order;
                acceptedOrders = await countOrders({Order_Status: "Accepted"});
                deliveredOrders = await countOrders({Order_Status: "Delivered"});
                canceledOrders = await countOrders({Order_Status: "Canceled"});
                unpaidOrders = await countOrders({Payment_Status: "Pending"});
                paidOrders = await countOrders({Payment_Status: "Paid"});

                await Order.sum("Total_Refund_Amount").then((totalRefund) => {
                    if(totalRefund != null){
                        totalRefunds = totalRefund;
                    }
                }).catch((err) => {
                    return res.send(err);
                });

                await Order.sum("T_Price", {
                    where: {
                        Payment_Status: "Paid"
                    }
                }).then((totalPayment) => {
                    if(totalPayment != null){
                        totalPayments = totalPayment - totalRefunds;
                    }
                }).catch((err) => {
                    return res.send(err);
                });
                
                return res.status(200).json({totalOrders, acceptedOrders, deliveredOrders, canceledOrders, unpaidOrders, paidOrders, totalRefunds, totalPayments})
            }

            return res.status(200).json({totalOrders, acceptedOrders, deliveredOrders, canceledOrders, unpaidOrders, paidOrders, totalRefunds, totalPayments})
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports = statistics