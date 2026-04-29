import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,  
        lowercase: true,
        minLength: 1,
        maxLength: 30,
        trim : true
    },
     password: {
         type: String, 
         required: true, 
        minLength: 1,
        maxLength: 30,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true
    }
}, 

{
    timestamps: true
}
);


//before saving any password to the database, we will hash it
userSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);

//In the above line "User" is the name of the model and \
// "userSchema" is the schema we defined for it.

//The mongoose will create a collection named "users" in 
// the database (lowercase and pluralized version of the model name) 
// to store documents that follow the userSchema structure.
//If the collection is not already present in the database, 
 //Mongoose will create it automatically when you first save a document 
 // using the Post model.