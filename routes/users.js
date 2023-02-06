const express=require('express');
const user = require('../models/user');
const router = express.Router();
const userdb=require('../models/user')
const jwt=require('jsonwebtoken')

//login
router.post('/login',(req,res,next)=>{ 
    const email=req.body.email;
    const password=req.body.password;
    const query={email}
    //check the User exist
    user.findOne(query,(err,user)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error, please try again'
            })
        }

        if(!user){
            return res.send({
                success:false,
                message:'Error,Account not found'
            })
        }
        user.isPasswordMatch(password,user.password,(err,isMatch)=>{
            if(!isMatch){
                return res.send({
                    success:false,
                message:'Error,invalid password'
                })
            }
            const ONE_WEEK=604800;
            const token=jwt.sign({user},process.env.SECRET)
            let returnUser={
                name:user.name,
                email:user.email,
                id:user._id,
                token
            }
            return res.send({
                success:this.true,
                message:"You can login now",
                user:returnUser
            })
        })
    });
});

//register
router.post('/register',(req,res,next)=>{
    let newUser=new userdb({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    console.log(newUser);
    newUser.save((err,user)=>{
        if(err){
            return res.send({
                success:false,
                message:"failed to save the user"
            })
        }
        res.send({
            success:true,
            user,
            message:"User Saved"
        })
    });
});

module.exports=router;