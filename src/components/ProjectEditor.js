import React, { useState } from 'react';
import ProjectTree from './ProjectTree';

function ProjectEditor() {
  const [code, setCode] = useState('');
  const [currentFile, setCurrentFile] = useState({ id: 'main', name: 'main.js', content: '' });
  const [files, setFiles] = useState([
    { id: 'main', name: 'main.js', content: '' }
  ]);

  const handleRun = () => {
    console.log('Running code:', code);
    // Implement code execution logic here
  };

  const handleFileSelect = (file) => {
    setCurrentFile(file);
    setCode(file.content || '');
  };

  const handleAddFile = () => {
    const newFileName = prompt("Enter new file name:");
    if (newFileName) {
      const newFile = { id: Date.now().toString(), name: newFileName, content: '' };
      setFiles([...files, newFile]);
    }
  };

  const handleFileAction = (file) => {
    const action = prompt("Choose action: rename, delete");
    if (action === 'rename') {
      const newName = prompt("Enter new name:");
      if (newName) {
        setFiles(files.map(f => f.id === file.id ? { ...f, name: newName } : f));
        if (currentFile.id === file.id) {
          setCurrentFile({...currentFile, name: newName});
        }
      }
    } else if (action === 'delete') {
      setFiles(files.filter(f => f.id !== file.id));
      if (currentFile.id === file.id) {
        setCurrentFile(files[0] || { id: '', name: '', content: '' });
        setCode(files[0]?.content || '');
      }
    }
  };

  return (
    <div className="project-editor">
      <ProjectTree 
        files={files} 
        onFileSelect={handleFileSelect}
        onAddFile={handleAddFile}
        onFileAction={handleFileAction}
      />
      <div className="editor-main">
        <div className="editor-header">
          <input 
            value={currentFile.name} 
            onChange={(e) => setCurrentFile({...currentFile, name: e.target.value})}
            className="file-name-input"
          />
          <button className="run-btn" onClick={handleRun}>Run</button>
        </div>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setCurrentFile({...currentFile, content: e.target.value});
            setFiles(files.map(f => f.id === currentFile.id ? {...f, content: e.target.value} : f));
          }}
          className="code-editor"
          placeholder="Type your code here..."
        />
      </div>
    </div>
  );
}

export default ProjectEditor;