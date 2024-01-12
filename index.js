const express=require('express');
const studentRoutes = require('./routes/StudentRoutes');
const dbConnect = require("./config/dbConnect");
const app=express()
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8888;
const cors = require('cors');

dbConnect();
app.use(cors());

app.use(express.json());
app.use('/api/student', studentRoutes);

app.listen (PORT, ()=>{ 
    console.log("Server is listening");
})


