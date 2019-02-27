const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = {
    name: {
        type: String,
        required:true,
    },
    artist: {
        type: String,
        required:true,
    },
    bpm: {
        type: Number,
        required:true
    }
};

const SongSchema = new Schema(_schema);
SongSchema.index({name: 'text', artist:'text'});
module.exports = mongoose.model('Song', SongSchema);