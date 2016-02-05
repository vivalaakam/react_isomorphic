import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
    text: String,
    title: String,
    user: mongoose.Schema.ObjectId,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('Page', PageSchema);