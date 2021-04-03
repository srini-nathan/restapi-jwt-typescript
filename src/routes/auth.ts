import { Router } from "express";
import { signUp, signIn, profile } from "../controllers/auth.controller";
import {tokenValidation} from '../libs/verifyTokens'

const router: Router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile",tokenValidation ,profile);

export default router;
