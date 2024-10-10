import nodemailer from "nodemailer"

export const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: "ds9999106554@gmail.com",
        pass: "ebtjkdmpdbsaoiof "
    }
})

