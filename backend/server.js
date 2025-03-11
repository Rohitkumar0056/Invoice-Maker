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

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Invoice Maker!");
});

app.listen(PORT, async () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);

    await connectToDatabase();
});

export default app;