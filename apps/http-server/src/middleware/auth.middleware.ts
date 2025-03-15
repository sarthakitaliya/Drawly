import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload{
    id: string;
    email: string;
}
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        if(typeof decoded !== "object" || !decoded.id){
            throw new Error("Invalid token");
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized"});
    }
}