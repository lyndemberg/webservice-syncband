const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = {
    name: {
        type: String,
        required:true,
        index: true
    },
    description: {
        type: String,
        required:true,
        index: true 
    },
    bpm: {
        type: Number,
        required:true
    }
};

const SongSchema = new Schema(_schema);
module.exports = mongoose.model('Song', SongSchema);