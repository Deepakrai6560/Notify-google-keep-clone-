import React from 'react';
import NoteCard from '../Notecard/Index.jsx';

const NotesList = ({ notes, onPin, onArchive, onChangeBg ,onDelete,onDeleteForever,showTrash }) => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '16px',
  };

  return (
    <div style={containerStyle}>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onPin={onPin}
          onArchive={onArchive}
          onChangeBg={onChangeBg}
          onDelete={onDelete}
          onDeleteForever={onDeleteForever}
          showTrash={showTrash}
        />
      ))}
    </div>
  );
};

export default NotesList;
