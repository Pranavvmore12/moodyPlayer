import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CleanMoodDetector from './Components/CleanMoodDetector'
import Songs from './Components/songs'
import AddSong from './Components/AddSong'
function App() {
  const [songs, setSongs] = useState([]);
  const [showAddSong, setShowAddSong] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px',
        background: 'radial-gradient(circle at top, #1f2937, #020617 45%)',
        color: '#f8fafc',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.03em',
              color: '#e2e8f0',
            }}
          >
            Moody Player
          </h1>
          <p style={{ margin: '8px 0 0', color: '#94a3b8' }}>
            Detect your mood, fetch songs, and play them instantly.
          </p>
        </div>

        <button
          onClick={() => setShowAddSong((prev) => !prev)}
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '14px 26px',
            color: '#fff',
            background: showAddSong
              ? 'linear-gradient(135deg, #ef4444 0%, #fb923c 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            cursor: 'pointer',
            boxShadow: '0 20px 50px rgba(59, 130, 246, 0.18)',
            fontWeight: 700,
          }}
        >
          {showAddSong ? 'Hide Add Song' : 'Add New Song'}
        </button>
      </div>

      {showAddSong && <AddSong setSongs={setSongs} />}
      <CleanMoodDetector setSongs={setSongs} />
      <Songs songs={songs} setSongs={setSongs} />
    </div>
  )
}   

export default App
