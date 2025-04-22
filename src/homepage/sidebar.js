import React, { useState } from 'react';
import '../servicepage/FeaturePage.css';
import { Link } from 'react-router-dom';

const features = [
  { category: 'Mostly Used', items: [
    { title: 'File Sharing', path: '/features/file-sharing' },
    { title: 'File Recovery', path: '/features/file-recovery' },
  ]},
  { category: 'Security & Privacy', items: [
    { title: 'End-to-End Encryption', path: '/docs/security/end-to-end-encryption.md' },
    { title: 'Blockchain File Verification', path: '/docs/security/blockchain-verification.md' },
    { title: 'Biometric Login Support', path: '/docs/security/biometric-login.md' },
  ]},
  { category: 'Smart AI Features', items: [
    { title: 'Smart File Tagging', path: '/docs/ai/smart-tagging.md' },
    { title: 'Smart Suggestions', path: '/docs/ai/smart-suggestions.md' },
    { title: 'AI Auto Cleanup', path: '/docs/ai/auto-cleanup.md' },
  ]},
  { category: 'Upload & Sync', items: [
    { title: 'Background Uploads', path: '/docs/sync/background-uploads.md' },
    { title: 'Offline Mode Sync', path: '/docs/sync/offline-sync.md' },
    { title: 'Cross-Platform Sync', path: '/docs/sync/cross-platform-sync.md' },
    { title: 'Scheduled File Sharing', path: '/docs/sync/scheduled-sharing.md' },
  ]},
  { category: 'File Management', items: [
    { title: 'Version History and Restore', path: '/docs/management/version-history.md' },
    { title: 'Custom File Expiry Links', path: '/docs/management/expiry-links.md' },
    { title: 'AR File Access', path: '/docs/management/ar-access.md' },
  ]},
  { category: 'Search & Access', items: [
    { title: 'Smart File Search', path: '/docs/search/smart-search.md' },
    { title: 'Voice Command Support', path: '/docs/search/voice-commands.md' },
    { title: 'Multilingual Interface', path: '/docs/search/multilingual-interface.md' },
  ]},
  { category: 'Collaboration & UI', items: [
    { title: 'Team Collaboration & Chat', path: '/docs/ui/collaboration-chat.md' },
    { title: 'Custom Theming / Dark Mode', path: '/docs/ui/dark-mode.md' },
    { title: 'Activity Dashboard & Analytics', path: '/docs/ui/activity-dashboard.md' },
  ]},
];

const Sidebar = ({ children }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="container2">
      <aside className="features-sidebar">
        <h2>Features</h2>
        <nav>
          {features.map((category, index) => (
            <div key={index} className="category">
              <h4
                className="category-title"
                onClick={() => toggleCategory(index)}
                style={{ cursor: 'pointer' }}
              >
                {category.category}
              </h4>
              {openCategory === index && (
                <ul>
                  {category.items.map((item, idx) => (
                    <li key={idx} className="list-item">
                      <Link to={item.path}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <main className='features-content'>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
