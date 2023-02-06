const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password:{type:String,required:true}
});
userSchema.pre('save', function(next){

    if(this.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            this.password=hash;
            next();
        })
    })
})

userSchema.methods.isPasswordMatch=function(plainPassword,hashed,callback){
    bcrypt.compare(plainPassword,hashed,(err,isMatch)=>{
        if(err){
            next(err);
        }
        callback(null,isMatch);
    })
}
const user=mongoose.model('User',userSchema);

module.exports=user;