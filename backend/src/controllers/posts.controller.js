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
            age,
            createdBy: req.user._id
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

        // check empty body
        if(Object.keys(req.body).length === 0) {

            return res.status(400).json({
                message: "No data provided to update the post"
            });
        }

        const {id} = req.params;

        const {name, description, age} = req.body;

        // find post first
        const post = await Post.findById(id);

        if(!post) {

            return res.status(404).json({
                message: "Post not found"
            });
        }

        // OWNER CHECK
        // req.user comes from verifyJWT middleware

        if(
            post.createdBy.toString() !== req.user._id.toString()
            &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({
                message: "You are not authorized to update this post"
            });
        }

        // update post
        post.name = name || post.name;
        post.description = description || post.description;
        post.age = age || post.age;

        await post.save();

        res.status(200).json({

            message: "Post updated successfully",

            post
        });

    } catch(error) {

        res.status(500).json({
            message: "Internal server error while updating post"
        });
    }
};



// delete a post
const deletePost = async (req, res) => {

    try {

        const {id} = req.params;

        // find post first
        const post = await Post.findById(id);

        if(!post) {

            return res.status(404).json({
                message: "Post not found"
            });
        }

        // OWNER / ADMIN CHECK

        if(
            post.createdBy.toString() !== req.user._id.toString()
            &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }

        // delete post
        await post.deleteOne();

        res.status(200).json({

            message: "Post deleted successfully",

            post
        });

    } catch(error) {

        res.status(500).json({
            message: "Internal server error while deleting post"
        });
    }
};

export {createPost, getposts, updatePost, deletePost};