import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface IPayload{
    _id: string;
    iat: number;
    exp: number;
}

export const tokenValidator = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json('access denied')
    }
    const payload = jwt.verify(token , process.env.TOKEN_SECRET || 'tokentest') as IPayload
    // console.log(payload);
    req.userId = payload._id
    next();
}