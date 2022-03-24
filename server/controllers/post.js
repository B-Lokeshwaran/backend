const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');

const getPosts = async(req,res)=>{
    try{
          const postMessages = await PostMessage.find();
          res.status(200).json(postMessages);         
    }catch(err){
         res.status(404).json({message: err.message});
    }
}

const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);  
    }catch(err){
        res.status(409).json({message: err.message});
    }
}
const updatePost = async(req,res)=>{
    const { id:_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No post with that id");
    }
    try{
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
        res.json(updatedPost);  
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

const deletePost = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No post with that id");
    }
    try{
        await PostMessage.findByIdAndRemove(id);
        res.json({message :"Post Deleted Successfully"});  
    }catch(err){
        res.status(409).json({message: err.message});
    }
}
const likePost = async (req, res) => {
    const { id } = req.params;
    
    if(!req.userId){
       return res.json({message: 'Unauthenticated'});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No post with that id");
    }
    try{
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id)=>id===String(req.userId) );

        if(index === -1){
           post.likes.push(req.userId);
        }else{
            post.likes=post.likes.filter((id)=>id!==String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
        
        res.json(updatedPost);  
    }catch(err){
        res.status(409).json({message: err.message});
    }
}
module.exports = { getPosts,createPost,updatePost,deletePost,likePost}