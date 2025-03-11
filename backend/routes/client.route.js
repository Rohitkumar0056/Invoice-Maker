import { Router } from "express";
import { getClientsByUser, createClient, updateClient, deleteClient } from "../controllers/client.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const clientRouter = Router();

clientRouter.route('/').post(authorize, createClient);
clientRouter.route('/user').get(authorize, getClientsByUser);
clientRouter.route('/:id').put(authorize, updateClient);
clientRouter.route('/:id').delete(authorize, deleteClient);

export default clientRouter;