import React, { useState } from 'react';

function ProjectTree({ files, onFileSelect, onAddFile, onFileAction }) {
  const renderTree = (items) => {
    return (
      <ul className="file-tree">
        {items.map((item) => (
          <li key={item.id}>
            <span onClick={() => onFileSelect(item)}>{item.name}</span>
            <button onClick={() => onFileAction(item)}>⋮</button>
            {item.children && renderTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="project-tree">
      <div className="project-header">
        <h3>Project Files</h3>
        <button onClick={onAddFile}>+</button>
      </div>
      {renderTree(files)}
    </div>
  );
}

export default ProjectTree;