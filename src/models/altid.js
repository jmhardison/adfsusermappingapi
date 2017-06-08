import mongoose from 'mongoose';
import User from './user.js';
let Schema = mongoose.Schema;

let AltidSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Altid', AltidSchema);