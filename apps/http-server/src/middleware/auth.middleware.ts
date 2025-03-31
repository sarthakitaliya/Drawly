import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload{
    id: string;
    email: string;
}
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies["next-auth.session-token"] || req.cookies["__Secure-next-auth.session-token"];
        
        if(!token){
            res.status(401).json({message: "JWT must be provided"});
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        
        if(typeof decoded !== "object" || !decoded.id){
            res.status(401).json({ message: "Invalid token" })
            return
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized"});
        return
    }
}