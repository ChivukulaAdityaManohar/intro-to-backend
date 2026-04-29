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