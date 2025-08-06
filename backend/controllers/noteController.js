const Note = require('../models/Note');

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log('user :-  ',req.user);
        const userId = req.user.id; // Get user ID from auth middleware
        
        const note = new Note({
            title,
            content,
            userId
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all notes for a user
exports.getNotes = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated
        const { isArchive , isTrash} = req.query; 
         // Build query dynamically
        const query = { userId };
        if (isArchive !== undefined) {
        query.isArchive = isArchive === "true"; // convert to boolean
        }

        if(isTrash!==undefined){
            query.isTrash = isTrash === "true"; // convert to boolean
        }

    const notes = await Note.find(query);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific note
exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { title, content, background, isPinned } = req.body;
        const note = await Note.findById(req.params.id);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update only if values are provided
        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;
        if (background !== undefined) note.background = background;
        if (isPinned !== undefined) note.isPinned = isPinned;

        const updatedNote = await note.save();
        
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        console.log("Delete note from backend")
        const {id}=req.params
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await note.deleteOne();
        res.json({success:true, message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({success:true,  message: error.message });
    }
};

//toggle archive note

exports.toggleArchive=async(req,res)=>{
        try {
        const {id}=req.params
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

       // Toggle the value
        note.isArchive = !note.isArchive;

        // Save the updated note
        await note.save();

        res.json({ success: true, message: `Note ${note.isArchive ? 'archived' : 'unarchived'}` });
    } catch (error) {
        res.status(500).json({success:true,  message: error.message });
    }
}

// toggle trash note
exports.toggleTrash=async(req,res)=>{
        try {
            console.log('xxxxxx')
        const {id}=req.params;
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

       // Toggle the value
        note.isTrash = !note.isTrash;

        // Save the updated note
        await note.save();

        res.json({ success: true, message: `Note ${note.isTrash ? 'trash' : 'untrash'}` });
    } catch (error) {
        res.status(500).json({success:true,  message: error.message });
    }
}