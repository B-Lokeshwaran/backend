const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routes/post.js');
const userRouter = require('./routes/users.js');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.urlencoded({limit: "30mb",extended: true }))
app.use(express.json({limit: "30mb",extended: true}));

app.use(cors());
app.use('/posts',postRouter);
app.use('/user',userRouter);

app.get("/",(req,res) => {
    res.send("Hello ");
})
const PORT = process.env.PORT || 3000

mongoose.connect("mongodb+srv://root:root@cluster0.mfvku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
,{useNewUrlParser:true,useUnifiedTopology:true})
 .then(()=>app.listen(PORT,()=> console.log(`listening on port ${PORT}`)))
 .catch((err)=>console.log(err.message));
mongoose.set('useFindAndModify',false);

