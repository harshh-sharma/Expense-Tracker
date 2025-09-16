import jwt from "jsonwebtoken";

export const isUserAuthenticated = async (req, res, next) => {
    try {
          const token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({
                success:false,
                message:"Unauthorized user"
            })
          }

          const decodeToken = jwt.verify(token, process.env.JWT_SECRET || "SECRET");

          req.user = decodeToken;

          next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error?.message
        })
    }
}
