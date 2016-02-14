import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    address: String,
    city: String,
    lat: Number,
    lng: Number,
    name: String,
    type: String,
    user: mongoose.Schema.ObjectId,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

export default mongoose.model('Place', PlaceSchema);