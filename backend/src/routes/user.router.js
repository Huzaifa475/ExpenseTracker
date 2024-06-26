import { Router } from 'express'
import {getCurrentUser, getUser, loginUser, logoutUser, registerUser, uploadAvatar} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/uploadavatar").post(verifyJWT, upload.single('avatar'), uploadAvatar);

router.route("/getuser").get(verifyJWT, getUser);

router.route("/get-currentuser").get(verifyJWT, getCurrentUser);

export default router