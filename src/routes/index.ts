import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";

const routes = Router()

routes.use("/auth", AuthRoutes );

export default routes;