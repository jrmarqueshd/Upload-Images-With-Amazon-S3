const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const Post = require("./models/Post");

routes.get("/posts", async (request, response)=>{
    const allPosts = await Post.find();
    return response.json(allPosts);
});

routes.delete("/posts/:id", async (request, response)=>{
    const post = await Post.findById(request.params.id);
    await post.remove();

    return response.send("Delete sucess");
});

routes.post("/posts", multer(multerConfig).single("file"), async (request, response)=>{
    const { 
        originalname: name, 
        size, 
        key,
        location: url = "", 
    } = request.file;

    const post = await Post.create({
        name,
        size,
        key,
        url,
    });

    return response.json(post);
});

module.exports = routes;