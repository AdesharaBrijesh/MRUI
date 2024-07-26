import React, { useState } from 'react';
import UserProfile from './UserProfile';
import ProjectTree from './ProjectTree';

function Sidebar({ setActivePage }) {
  const [showProjectTree, setShowProjectTree] = useState(false);
  const [files, setFiles] = useState([
    { id: 'main', name: 'main.js', content: '' }
  ]);

  const handleProjectClick = () => {
    setActivePage('project');
    setShowProjectTree(true);
  };

  const handleProjectOptions = (e) => {
    e.stopPropagation();
    const action = prompt("Choose action: New File, New Folder");
    if (action === 'New File') {
      const newFileName = prompt("Enter new file name:");
      if (newFileName) {
        setFiles([...files, { id: Date.now().toString(), name: newFileName, content: '' }]);
      }
    } else if (action === 'New Folder') {
      // Handle new folder creation (for simplicity, we'll just add it as a file for now)
      const newFolderName = prompt("Enter new folder name:");
      if (newFolderName) {
        setFiles([...files, { id: Date.now().toString(), name: newFolderName, isFolder: true, children: [] }]);
      }
    }
  };

  const handleFileSelect = (file) => {
    // You might want to handle file selection here or pass it up to a parent component
    console.log("Selected file:", file);
  };

  const handleFileAction = (file) => {
    const action = prompt("Choose action: rename, delete");
    if (action === 'rename') {
      const newName = prompt("Enter new name:");
      if (newName) {
        setFiles(files.map(f => f.id === file.id ? { ...f, name: newName } : f));
      }
    } else if (action === 'delete') {
      setFiles(files.filter(f => f.id !== file.id));
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="app-name">MyCodeApp</h1>
      <nav>
        <button onClick={() => setActivePage('dashboard')}>Dashboard</button>
        <div className="project-nav">
          <button onClick={handleProjectClick}>Project</button>
          <button onClick={handleProjectOptions} className="options-btn">⋮</button>
        </div>
        {showProjectTree && (
          <ProjectTree 
            files={files} 
            onFileSelect={handleFileSelect}
            onAddFile={() => handleProjectOptions({ stopPropagation: () => {} })}
            onFileAction={handleFileAction}
          />
        )}
        <button onClick={() => setActivePage('community')}>Community</button>
        <button onClick={() => setActivePage('settings')}>Settings</button>
      </nav>
      <UserProfile />
    </aside>
  );
}

export default Sidebar;