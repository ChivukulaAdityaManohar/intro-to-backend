import {Router} from 'express';
import {createPost,getposts,updatePost,deletePost} from '../controllers/posts.controller.js';
import {
    verifyJWT,
    authorizeRoles
} from "../middleware/auth.middleware.js";


const router = Router();

router.route("/create").post(verifyJWT,createPost); 
router.route("/getPosts").get(getposts); 
router.route("/update/:id").patch(verifyJWT,updatePost); 
router.route("/delete/:id").delete(verifyJWT,deletePost);
export default router;