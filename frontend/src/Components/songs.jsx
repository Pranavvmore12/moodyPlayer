import React from 'react';

const Songs = () => {
  const [songs, setSongs] = React.useState([
    {
      title: 'Song 1',
      artist: 'Artist 1',
      mood: 'happy',
      isPlaying: false,
    },
    {
      title: 'Song 2',
      artist: 'Artist 2',
      mood: 'sad',
      isPlaying: false,
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
      mood: 'angry',
      isPlaying: false,
    },
  ]);

  const toggleSong = (index) => {
    setSongs((prevSongs) =>
      prevSongs.map((song, i) =>
        i === index
          ? { ...song, isPlaying: !song.isPlaying }
          : song
      )
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
        maxWidth: '900px',
        margin: '32px auto',
        padding: '0 16px',
        boxSizing: 'border-box',
        gap: '16px',
      }}
    >
      {songs.map((song, index) => (
        <div
          key={index}
          className="song-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '600px',
            minHeight: '70px',
            boxSizing: 'border-box',
            padding: '16px 20px',
            backgroundColor: song.isPlaying
              ? '#f0f7ff'
              : '#ffffff',
            borderRadius: '14px',
            border: song.isPlaying
              ? '1px solid #0070f3'
              : '1px solid #e8e8e8',
            boxShadow:
              '0 4px 12px rgba(0, 0, 0, 0.08)',
            gap: '16px',
          }}
        >
          {/* Song information */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flex: 1,
              minWidth: 0,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                color: '#222',
              }}
            >
              {song.title}
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#777',
              }}
            >
              {song.artist}
            </p>
          </div>

          {/* Mood */}
          <div
            style={{
              padding: '7px 14px',
              borderRadius: '20px',
              backgroundColor: '#eef5ff',
              color: '#0070f3',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          >
            {song.mood}
          </div>

          {/* Start / Stop Button */}
          <button
            onClick={() => toggleSong(index)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: song.isPlaying
                ? '#e53935'
                : '#0070f3',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '72px',
              transition: '0.2s ease',
            }}
          >
            {song.isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Songs;
