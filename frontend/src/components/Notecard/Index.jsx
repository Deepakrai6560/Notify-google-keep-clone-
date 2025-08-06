import React from 'react';
import { FiFlag, FiTrash, FiArchive } from 'react-icons/fi';
import { PiPaintBrushBroadDuotone } from "react-icons/pi";
import { MdOutlineArchive, MdRestore } from "react-icons/md";
import { BsPin } from "react-icons/bs";
import "./Index.css";

const NoteCard = ({ note, onPin, onArchive, onChangeBg, onDelete, onDeleteForever, showTrash }) => {
  const { _id, title, time, isPinned, background, content } = note;

  const cardStyle = {
    backgroundColor: background || '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    width: '250px',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  };

  const pinStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    transform: isPinned ? 'rotate(45deg)' : 'none',
    color: isPinned ? 'black' : 'gray',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
  };

  const contentStyle = {
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  };

  const timeStyle = {
    fontSize: '14px',
    color: '#666',
  };

  const actionsStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
    color: '#666',
  };

  return (
    <div style={cardStyle}>
      <div style={pinStyle} onClick={() => onPin(_id)}>
        <BsPin size={18} />
      </div>

      <h2 style={titleStyle}>{title}</h2>
      <p style={contentStyle}>{content || ''}</p>
      <p style={timeStyle}>{time || ''}</p>

      {showTrash ? (
        <div style={actionsStyle}>
          <div className='tooltip-wrapper notesIcon notesIcon-hover'>
            <MdRestore size={18} onClick={() => onDelete(_id)} />
            <span className='custom-tooltip'>Restore</span>
          </div>
          <div className='tooltip-wrapper notesIcon notesIcon-hover'>
            <FiTrash size={16} onClick={() => onDeleteForever(_id)} />
            <span className='custom-tooltip'>Delete Forever</span>
          </div>
        </div>
      ) : (
        <div style={actionsStyle}>
          <div className='tooltip-wrapper notesIcon notesIcon-hover'>
            <PiPaintBrushBroadDuotone size={18} onClick={() => onChangeBg(_id)} />
            <span className='custom-tooltip'>Background Color</span>
          </div>
          <div className='tooltip-wrapper notesIcon notesIcon-hover'>
            <MdOutlineArchive size={18} onClick={() => onArchive(_id)} />
            <span className='custom-tooltip'>Archive</span>
          </div>
          <div className='tooltip-wrapper notesIcon notesIcon-hover'>
            <FiTrash size={18} onClick={() => onDelete(_id)} />
            <span className='custom-tooltip'>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
