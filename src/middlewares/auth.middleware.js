import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const protect = asyncHandler(async (
    req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY || '')

            req.user = await User.findById(decode._id).select("-password -refreshToken")
            if (!req.user || req.user == null) {
                res.status(404)
                throw new Error("user is not found")
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: "Not Authorized,token expire" })
        }
    }
    if (!token) {
        res.status(403);
        throw new Error("Not authorized, no token");
    }
})

export const roles = (requiredRole) => {
    return asyncHandler(async (req, res, next) => {
        try {
            if (requiredRole.includes(req.user.role)) {
                next();
            } else {
                res.status(403).json({ message: `Only ${requiredRole} allowed` });
            }
        } catch (error) {
            console.log(error)
        }
    })
}