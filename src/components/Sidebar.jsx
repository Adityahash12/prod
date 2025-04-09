import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-full">
            <ul>
                <li className="p-4">Dashboard</li>
                <li className="p-4">Upload</li>
                <li className="p-4">Insights</li>
                <li className="p-4">Compliance</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
