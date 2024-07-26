import React, { useState } from 'react';

function TopNavBar({ users }) {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareLink, setShareLink] = useState('https://example.com/share/abc123');

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  return (
    <nav className="top-nav-bar">
      <div className="search-area">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="user-actions">
        {users.map(user => (
          <img key={user.id} src={user.avatar} alt={user.name} className="user-avatar" />
        ))}
        <button onClick={handleShare} className="share-btn">Share</button>
      </div>
      {showSharePopup && (
        <div className="share-popup">
          <h3>Share your code</h3>
          <input type="text" value={shareLink} readOnly />
          <button onClick={handleCopy}>Copy</button>
          <button onClick={() => setShowSharePopup(false)}>Close</button>
        </div>
      )}
    </nav>
  );
}

export default TopNavBar;