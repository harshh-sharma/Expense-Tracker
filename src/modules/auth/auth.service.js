import prisma from "../../prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 const register = async (data) => {
   const isEmailExist = await prisma.user.findUnique({
    where:{email: data?.email}
   })
   if(isEmailExist) throw new Error('Email already exist');
   const hashPassword = await bcrypt.hash(10, data?.password);
   const user = await prisma.user.create({
    data:{
        ...data,
        password: hashPassword
    }
   });

   return user;
}
 const login = async ({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email}
    });

    if(!user) throw new Error('User not found');

    const passwordIsCorrect = await bcrypt.compare(password, user?.password);
    if(!passwordIsCorrect) throw new Error('Invalid Password');

    const token = jwt.sign({userId:user?.id},process.env.JWT_SECRET || 'SECRET',{expiresIn: "5m"});

    return {user, token}
}


export default {
    register,
    login
}