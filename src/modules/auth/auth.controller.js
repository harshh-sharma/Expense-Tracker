import * as UserService from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await UserService.register(req.body);
        return res.status(200).json({
            success:true,
            message:"user successfully registered"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserService.login(req.body);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user successfully loggedIn",
            data:user
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}