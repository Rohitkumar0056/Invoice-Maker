import { Router } from "express";
import { registerUser, authUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(authUser);

export default userRouter;