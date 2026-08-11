import React from 'react';

const Songs = ({ songs = [], setSongs }) => {
  const audioRefs = React.useRef([]);

  const handleAudioEnded = (index) => {
    if (!setSongs) return;
    setSongs((prevSongs) =>
      prevSongs.map((song, i) =>
        i === index ? { ...song, isPlaying: false } : song
      )
    );
  };

  const toggleSong = (index) => {
    setSongs((prevSongs) =>
      prevSongs.map((song, i) => {
        const audio = audioRefs.current[i];

        if (i === index) {
          if (song.isPlaying) {
            audio?.pause();
            return { ...song, isPlaying: false };
          }

          audio?.play();
          return { ...song, isPlaying: true };
        }

        if (audio) {
          audio.pause();
        }

        return { ...song, isPlaying: false };
      })
    );
  };

  return (
    <div
      className="songs-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1000px',
        margin: '32px auto',
        padding: '0 16px',
        boxSizing: 'border-box',
        gap: '20px',
      }}
    >
      {songs.length === 0 ? (
        <div
          style={{
            width: '100%',
            maxWidth: '700px',
            padding: '24px',
            borderRadius: '24px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.16)',
            textAlign: 'center',
            color: '#cbd5e1',
          }}
        >
          <p style={{ margin: 0, fontSize: '18px' }}>
            No songs found yet. Click Detect Mood to load songs from the backend.
          </p>
        </div>
      ) : (
        songs.map((song, index) => (
          <div
            key={index}
            className="song-card"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '22px',
              borderRadius: '24px',
              background: song.isPlaying
                ? 'linear-gradient(135deg, rgba(59,130,246,0.16), rgba(16,185,129,0.12))'
                : 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(100, 116, 139, 0.2)',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.35)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '22px',
                    color: '#f8fafc',
                  }}
                >
                  {song.title}
                </h3>
                <p
                  style={{
                    margin: '8px 0 0',
                    color: '#94a3b8',
                    fontSize: '15px',
                  }}
                >
                  {song.artist}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: '999px',
                    background: 'rgba(59, 130, 246, 0.16)',
                    color: '#7dd3fc',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    fontSize: '13px',
                  }}
                >
                  {song.mood}
                </div>
                <button
                  onClick={() => toggleSong(index)}
                  style={{
                    padding: '12px 22px',
                    border: 'none',
                    borderRadius: '999px',
                    background: song.isPlaying
                      ? 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: song.isPlaying
                      ? '0 16px 30px rgba(239, 68, 68, 0.24)'
                      : '0 16px 30px rgba(59, 130, 246, 0.24)',
                  }}
                >
                  {song.isPlaying ? 'Stop' : 'Start'}
                </button>
              </div>
            </div>

            {song.audio ? (
              <audio
                controls
                ref={(element) => {
                  audioRefs.current[index] = element;
                }}
                onEnded={() => handleAudioEnded(index)}
                src={song.audio}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  borderRadius: '16px',
                  background: '#0f172a',
                }}
              />
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#94a3b8',
                }}
              >
                Audio URL not available for this song.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Songs;
