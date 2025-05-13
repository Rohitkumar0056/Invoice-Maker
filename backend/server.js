import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT, NODE_ENV} from './config/env.js';

import clientRouter from './routes/client.route.js';
import userRouter from './routes/user.route.js';
import invoiceRouter from './routes/invoice.route.js';
import connectToDatabase from './config/mongodb.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import pdfTemplate from './documents/index.js';
import emailTemplate from './documents/email.js';
import nodemailer from "nodemailer";
import pdf from "html-pdf";
import path from "path";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/clients", clientRouter);
app.use("/api/invoices", invoiceRouter);

const __dirname1 = path.resolve();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASS}`
    }
});


var options = { format: 'A4' };
//SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email } = req.body

    // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
       
          // send mail with defined transport object
        transporter.sendMail({
            from: `Invoice Maker`, // sender address
            to: `${email}`, // list of receivers
            replyTo: `${process.env.USER}`,
            subject: `Invoice`, // Subject line
            text: `Invoice`, // plain text body
            html: emailTemplate(req.body), // html body
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname1}/invoice.pdf`
            }]
        });
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
     res.sendFile(`${__dirname1}/invoice.pdf`)
})

// --------------------------deployment------------------------------
const __dirname2 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname2, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname2, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);

    await connectToDatabase();
});

export default app;