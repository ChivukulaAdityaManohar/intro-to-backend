import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    name: {
        type: String, 
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim : true
    },
    age : {
        type: Number,
        required: true,
        min : 0,
        max : 150
    }
},
 {
    timestamps: true
});

export const Post = mongoose.model("Post", postSchema);

//In the above line "Post" is the name of the model and \
// "postSchema" is the schema we defined for it.

//The mongoose will create a collection named "posts" in 
// the database (lowercase and pluralized version of the model name) 
// to store documents that follow the postSchema structure.
//If the collection is not already present in the database, 
 //Mongoose will create it automatically when you first save a document 
 // using the Post model.
