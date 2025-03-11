import { Router } from "express";
import { getInvoice, createInvoice, updateInvoice, deleteInvoice, getTotalCount, getInvoicesByUser } from "../controllers/invoice.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const invoiceRouter = Router();

invoiceRouter.route('/count').get(authorize, getTotalCount);
invoiceRouter.route('/:id')
    .get(authorize, getInvoice)
    .delete(authorize, deleteInvoice)
    .put(authorize, updateInvoice);
invoiceRouter.route("/")
    .post(authorize, createInvoice)
    .get(authorize, getInvoicesByUser);

export default invoiceRouter;