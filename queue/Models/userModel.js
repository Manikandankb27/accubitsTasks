import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true },
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    });

const User = mongoose.model("users", UserSchema);

export default User;