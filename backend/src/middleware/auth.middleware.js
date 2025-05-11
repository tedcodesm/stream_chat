import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(403).json({message:"unauthorized - No token provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(404).json({message:"unauthorized - Invalid token"});
        }


        const user = await User.findById(decoded.userId).select("-password"); //selects the users but ignores the password
        if(!user){
            return res.status(407).json({message:"unauthorized - user not found"});
        }

        req.user = user; //get the user without the password 

        next()
    } catch (error) {
        console.log("error in protecting route middleware",error);
        res.status(500).json({message:"internAL server error"});
    }
}