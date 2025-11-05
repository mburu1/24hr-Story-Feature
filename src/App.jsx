import StoriesList from './components/StoriesList';
import StoryViewer from './components/StoryViewer';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <h1 className="app-title">Stories</h1>
        <div className="app-subtitle">24-Hour Stories Feature</div>
      </header>

      <main className="app-main">
        <StoriesList />

        <div className="app-content">
          <div className="welcome-section">
            <h2>📸 Share Your Moments</h2>
            <p>Upload photos that disappear after 24 hours</p>

            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">⏱️</span>
                <h3>24-Hour Stories</h3>
                <p>Stories automatically expire after 24 hours</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">👆</span>
                <h3>Swipe Navigation</h3>
                <p>Swipe left/right to navigate between stories</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">💾</span>
                <h3>Local Storage</h3>
                <p>Stories saved in your browser's local storage</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">📱</span>
                <h3>Responsive Design</h3>
                <p>Works perfectly on mobile and desktop</p>
              </div>
            </div>

            <div className="instructions">
              <h3>How to Use:</h3>
              <ol>
                <li>Click the <strong>+ button</strong> to upload a photo</li>
                <li>Your story will appear in the list above</li>
                <li>Click on any story to view it full-screen</li>
                <li>Swipe left/right or use arrow keys to navigate</li>
                <li>Stories automatically disappear after 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <StoryViewer />

      <footer className="app-footer">
        <p>Built with React + Vite + Zustand + Framer Motion</p>
        <p className="footer-note">
          Images are stored locally in your browser • Max size: 1080x1920px
        </p>
      </footer>
    </div>
  );
}

export default App;
