import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ onSelect }) => {
    const menuItems = [
         "orders","users", "extensions", "services", "blogposts"
    ];
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    const handleSelect = (item) => {
        setSelectedItem(item);
        onSelect(item);
    };

    return (
        <div className="sidebar">
            <Nav className="flex-column">
                {menuItems.map((item, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link
                            className={`text-black ${selectedItem === item ? 'selected' : ''}`}
                            href="#"
                            onClick={() => handleSelect(item)}
                            style={{ textTransform: 'capitalize' }} // Capitalize first letter
                        >
                            {item}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar;
