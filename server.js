require('dotenv').config();
const express = require('express');
const path=require('path');
const cors=require('cors');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const middlewareWrapper = require('cors');
const passport=require('passport')

//Intialize app with express
const app=express();

const userRoutes = require('./routes/users')
const taskRoutes=require('./routes/tasks');
const { session } = require('passport');

//Database Connection

// mongoose.connect(process.env.db,{useNewUrlParser: true, useUnifiedTopology:true})
//  .then((result)=>{console.log('db conencted')})
//  .catch((err)=>{
//     console.log(err)})




mongoose.connect(process.env.db);
mongoose.connection.on('connected',()=>{
    console.log('Connection established')
})
mongoose.connection.on('error', (err)=>{
    console.log('Unable to connect')
    console.log(err.message)
    })
    



    // app.use(passport.initialize());
    // app.use(passport.session());
    
    // middleware
    app.use(cors())
    app.use(bodyParser.json());
    app.use(passport.initialize());
    // app.use(passport.session());
    require('./config/passport')(passport);

    app.use(express.static(path.join(__dirname,'public')));
    
    app.use('/users',userRoutes) 
    app.use('/tasks',taskRoutes) 
    // middleware
    
    app.get('/',(req,res)=>{
        res.send("hello")
    })
    
    
    
    
    app.listen(process.env.PORT,()=>{
        console.log("server started");
        console.log('   '+process.env.PORT)
        // console.log('http://localhost:3000')
    });
    