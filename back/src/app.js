// ENV
require("dotenv").config({ path: __dirname + "/.env" });

// Database
const sequelize = require("./db/conn");
const mysql = require("mysql2");

// Models
sequelize.sync();
const Logo = require("./models/logo");
const User = require("./models/register");
const MainCategory = require("./models/mainCategory");
const Category = require("./models/category");
const SubCategory = require("./models/subCategory");
const Product = require("./models/product");
const Attribute = require("./models/attribute");
const Banner = require("./models/banner");
const Policy = require("./models/policy");
const Contact = require("./models/contact");
const Wishlist = require("./models/wishlist");
const Cart = require("./models/cart");
const Coupon = require("./models/coupon");
const Address = require("./models/address");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

// Package
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");

// PORT
const port = process.env.PORT || 8000;

// Routes
const logo_router = require("./routes/logo");
const register_router = require("./routes/register");
const login_router = require("./routes/login");
const category_router = require("./routes/category");
const product_router = require("./routes/product");
const attribute_router = require("./routes/attribute");
const banner_router = require("./routes/banner");
const policy_router = require("./routes/policy");
const contact_router = require("./routes/contact");
const wishlist_router = require("./routes/wishlist");
const coupon_router = require("./routes/coupon");
const cart_router = require("./routes/cart");
const address_router = require("./routes/address");
const order_router = require("./routes/order");
const order_item_router = require("./routes/orderItem");
const payment_router = require("./routes/payment");
const statistics_router = require("./routes/statistics");
const forget_passwort_router = require("./routes/forgetPass");

// Express App
const app = express();

// Middle Ware
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(fileUpload());

// Controllers
app.use("/logo", logo_router);
app.use("/register", register_router);
app.use("/login", login_router);
app.use("/category", category_router);
app.use("/product", product_router);
app.use("/attribute", attribute_router);
app.use("/banner", banner_router);
app.use("/policy", policy_router);
app.use("/contact", contact_router);
app.use("/wishlist", wishlist_router);
app.use("/coupon", coupon_router);
app.use("/cart", cart_router);
app.use("/address", address_router);
app.use("/order", order_router);
app.use("/orderitem", order_item_router);
app.use("/payment", payment_router);
app.use("/statistics", statistics_router);
app.use("/forgetpassword", forget_passwort_router);

// Listening
app.listen(port, () => {
    console.log(`Listening at ${port}`);
});