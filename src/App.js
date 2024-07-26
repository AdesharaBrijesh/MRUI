import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavBar from './components/TopNavBar';
import Dashboard from './components/Dashboard';
import ProjectEditor from './components/ProjectEditor';
import Community from './components/Community';
import Settings from './components/Settings';
import './styles/index.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [users, setUsers] = useState([{ id: 1, name: 'Current User', avatar: 'https://via.placeholder.com/40' }]);

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard': return <Dashboard />;
      case 'project': return <ProjectEditor />;
      case 'community': return <Community />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        <TopNavBar users={users} />
        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;