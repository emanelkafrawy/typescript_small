import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'

import User, {IUser} from '../models/User'

export const signup = async (req: Request, res: Response)=>{

    const user: IUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
   user.password = await user.encryptmethod(user.password);
    const saveduser = await user.save();

    const token:String = jwt.sign({
        _id: saveduser._id.toString()
    },
        process.env.TOKEN_SECRET || 'tokenttest',
        {expiresIn: 60* 60 * 24}
    )
    // res.header("auth-token", token).json(saveduser)
    res.status(200).json({
        message: "success",
        token: token
    })
}
export const signin = async (req: Request, res: Response)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({
            message: 'not found'
        })
    }
    const correct = await user.validatepassword(req.body.password);
    if(!correct){
        return res.status(400).json({
            message: 'pass not correct'
        })
    }
    const token = await jwt.sign({
        _id: user._id.toString()
    },
        process.env.TOKEN_SECRET || 'tokenttest',
    {
        expiresIn: 60 * 60 * 24
    })
     res.header("auth-token", token).json(user)
    // res.status(200).json({
    //     message: 'logged in success',
    //     user: user,
    //     token: token
    // })
}
export const profile = async(req: Request, res: Response)=>{
    const user = await User.findOne(req.userId,{ password:0}); //means not view
    if(!user){
        return res.status(404).json({
            message: 'not found'
        })
    }
    res.status(200).json({
        message: 'user here',
        user: user
    })
}