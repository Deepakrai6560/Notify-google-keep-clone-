const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isArchive: { type: Boolean, default: false },
    isTrash: { type: Boolean, default: false },
    background: { type: String, default: "#ffffff" }  
});

module.exports = mongoose.model('Note', noteSchema);
