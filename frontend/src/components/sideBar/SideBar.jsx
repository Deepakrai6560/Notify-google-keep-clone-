import './sideBar.css';
import { FaLightbulb, FaBell, FaPen, FaArchive, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SideBar = () => {
  const [active, setActive] = useState('notes');
  const navigate = useNavigate();

  const items = [
    { name: 'notes', icon: <FaLightbulb />, label: 'Notes', path: '/' },
    { name: 'reminders', icon: <FaBell />, label: 'Reminders', path: '/reminders' },
    { name: 'edit', icon: <FaPen />, label: 'Edit Labels', path: '/edit-labels' },
    { name: 'archive', icon: <FaArchive />, label: 'Archive', path: '/archive' },
    { name: 'trash', icon: <FaTrash />, label: 'Trash', path: '/trash' },
  ];

  const handleItemClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  return (
    <div className="sidebar-container">
      {items.map((item) => (
        <div
          key={item.name}
          className={`sidebar-item ${active === item.name ? 'active' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <div className="icon">{item.icon}</div>
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
