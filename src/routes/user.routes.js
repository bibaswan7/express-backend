import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, changeCurrentPassword, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { protect,roles } from "../middlewares/auth.middleware.js";
import validateModal from "../utils/feildValidator.js";
import { User } from "../models/user.model.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    validateModal(User.schema),
    registerUser
    );
    
router.route("/login").post(validateModal(User.schema),loginUser);


// secured routes
router.route("/logout").post(protect,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(protect, changeCurrentPassword)
// use case of role
router.route("/current-user").get(protect,roles["admin", "user"], getCurrentUser);
router.route("/avatar").patch(protect, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(protect, upload.single("coverImage"), updateUserCoverImage)

export default router