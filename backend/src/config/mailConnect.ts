import nodemailer from "nodemailer"

import {config} from "dotenv"

config();

export const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.EMAIL_KEY
    }
})

