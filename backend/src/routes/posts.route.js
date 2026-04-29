import {Router} from 'express';
import {createPost,getposts,updatePost,deletePost} from '../controllers/posts.controller.js';

const router = Router();

router.route("/create").post(createPost); 
router.route("/getPosts").get(getposts); 
router.route("/update/:id").patch(updatePost); 
router.route("/delete/:id").delete(deletePost);
export default router;