import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('User', UserSchema);