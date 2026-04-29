import {Post} from '../models/posts.model.js';

const createPost = async (req, res) => {
    try {
        const {name, description, age} = req.body;
        
        if (!name || !description || !age ) {
            return res.status(400).json({message: "All fields are required to post"});
        }
        const post = await Post.create({
            name,
            description,
            age
        });
        res.status(201).json({
            message: `Post created successfully  post details : ${post}`,
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};

const getposts = async (req, res) => {
    try {
        const getPosts = await Post.find();
        res.status(200).json({
            message: `Posts retrieved successfully`,
            posts: getPosts
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error while fetching all posts"});
    }
};


//updating posts
const updatePost = async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({message: "No data provided to update the post"});
        }
        const {id} = req.params;
        const {name, description, age} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, {name, description, age}, {new: true});

        if (!updatedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({
            message: `Post updated successfully`,
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error while updating post"});
    }
};



// delete a post
const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({
            message: `Post deleted successfully`,
            post: deletedPost
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error while deleting post"});
    }
};

export {createPost, getposts, updatePost, deletePost};