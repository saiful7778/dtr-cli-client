import { Router } from "express";
import registerController from "./controllers/register.controller";

const authRoute = Router();

authRoute.post("/register", registerController);

export default authRoute;
