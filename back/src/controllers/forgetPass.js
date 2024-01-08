const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const User = require("../models/register");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const userVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ "msg": "Some field is empty." });
    }

    await User.findOne({
      attributes: ["Id"],
      where: {
        Email: email
      }
    }).then(async (id) => {
      if (id != null) {
        const token = await jwt.sign({ Id: id.dataValues.Id }, process.env.JWT_SECRET_KEY);

        const random = randomIntFromInterval(1000, 9999).toString();

        await User.update({
          Otp: random
        }, {
          where: {
            Id: id.dataValues.Id
          }
        }).then(() => {
          const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.MAIL_PASS,
            },
          });

          const info = {
            from: process.env.MAIL_ID,
            to: email,
            subject: "OTP to reset password",
            html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Email verification code</title>
                
                    <link
                      rel="stylesheet"
                      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                    />
                    <link
                      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
                      rel="stylesheet"
                    />
                    <style>
                      * {
                        box-sizing: border-box;
                      }
                
                      body {
                        font-family: "Montserrat", sans-serif;
                        margin: 0;
                        padding: 0;
                      }
                
                      img {
                        max-width: 100%;
                      }
                
                      table {
                        border-collapse: collapse;
                      }
                    </style>
                  </head>
                  <body style="background-color: #fff">
                    <table
                      style="
                        margin: auto;
                        background-color: #f4f4f4;
                        max-width: 700px;
                        width: 100%;
                        padding: 50px 20px 20px;
                        display: block;
                        border-collapse: collapse;
                       text-align:center"
                       
                    >
                      <tbody>
                        <tr>
                          <td colspan="2">
                            <div class="header_img">
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h1 style="font-size:26px;font-weight: 700; margin-bottom: 0px; color: #434245">
                              Confirm your email address
                            </h1>
                            <p style="color: #2d2d2d">
                              Your confirmation code is below — enter it in your open browser
                              window and we'll help you get signed in.
                            </p>
                            <div
                              style="
                                background-color: #fff;
                                padding: 16px 0px;
                                margin: 32px 10px;
                              "
                            >
                              <table style="margin: auto">
                                <tr>
                                  <td
                                    style="
                                      vertical-align: middle;
                                      font-size: 30px;
                                      font-weight: 500;
                                      color: #2d2d2d;
                                    "
                                  >
                                    ${random}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <p style="padding: 0 0 30px 0; color: #2d2d2d">
                              If you didn’t request this email, there’s nothing to worry about —
                              you can safely ignore it.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                     
                    </table>
                  </body>
                </html>`,
          };

          transporter.sendMail(info, (err) => {
            if (err) {
              return res.send(err);
            } else {
              return res.status(200).json({ "msg": "E-mail sent.", token });
            }
          });
        }).catch((err) => {
          return res.send(err);
        });
      } else {
        return res.status(409).json({ "msg": "Account does not exist." });
      }
    }).catch((err) => {
      res.send(err);
    });
  } catch (err) {
    res.send(err);
  }
}

const otpVerification = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ "msg": "Some field is empty." });
    }

    await User.findOne({
      attributes: ["Otp"],
      where: {
        Id: req.user.Id
      }
    }).then(async (otpNumber) => {
      if (otpNumber != null) {
        if (otpNumber.dataValues.Otp == otp) {
          return res.status(200).json({ "msg": "OTP matched." });
        } else {
          return res.status(409).json({ "msg": "OTP not matched." });
        }
      } else {
        return res.status(400).json({ "msg": "Bad request." });
      }
    })
  } catch (err) {
    res.send(err);
  }
}

const passwordUpdate = async (req, res) => {
  try {
    let { newpass } = req.body;

    if (!newpass) {
      return res.status(400).json({ "msg": "Some field is empty." });
    }

    newpass = await bcrypt.hash(newpass, 10);

    await User.update({
      Password: newpass,
      Otp: 0
    },{
      where: {
        Id: req.user.Id
      }
    }).then(() => {
      res.status(200).json({ "msg": "Password reset successfully." });
    }).catch((err) => {
      res.send(err);
    });
  } catch (err) {
    res.send(err);
  }
}

module.exports = { userVerification, otpVerification, passwordUpdate }