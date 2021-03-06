import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    text: String,
    user: mongoose.Schema.ObjectId,
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('Todo', TodoSchema);