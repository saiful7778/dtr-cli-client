import { Router } from "express";
import registerController from "./controllers/register.controller";
import loginController from "./controllers/login.controller";

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

export default authRoute;
