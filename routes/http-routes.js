import { Router } from "express";
import * as httpCTRL from "../controllers/http-controller.js";

const router = Router();

router.get("*", httpCTRL.httpRedirectAll);

export default router;
