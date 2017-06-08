import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    realid: {
        type: String,
        required: true
    },
    altids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Altid'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);