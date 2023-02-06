const mongoose=require('mongoose');
const taskSchema=mongoose.Schema({
    name:{type:String , required:true},
    done:{type:Boolean},
    owner:{type:String , required:true}
})

const task=mongoose.model('Task',taskSchema)
module.exports=task;