import React, { useState } from 'react';

const moods = [
  'happy',
  'sad',
  'angry',
  'fearful',
  'disgusted',
  'surprised',
  'neutral',
];

const AddSong = ({ setSongs }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [mood, setMood] = useState('happy');
  const [audioFile, setAudioFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !artist || !mood || !audioFile) {
      setStatus('Please fill all fields and choose an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('mood', mood);
    formData.append('audio', audioFile);

    setLoading(true);
    setStatus('Uploading song...');

    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Upload failed');
      }

      const result = await response.json();
      const addedSong = result.song || result;

      if (addedSong && setSongs) {
        setSongs((prevSongs) => [
          { ...addedSong, isPlaying: false },
          ...prevSongs,
        ]);
      }

      setTitle('');
      setArtist('');
      setMood('happy');
      setAudioFile(null);
      setStatus('Song added successfully.');
    } catch (err) {
      console.error('Add song error:', err);
      setStatus('Failed to add song. Check backend status and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '24px auto',
        padding: '28px',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, rgba(15,23,42,0.95), rgba(15,23,42,0.9))',
        border: '1px solid rgba(148, 163, 184, 0.16)',
        boxShadow: '0 30px 80px rgba(15, 23, 42, 0.65)',
      }}
    >
      <h2 style={{ margin: '0 0 16px', fontSize: '24px', color: '#f8fafc' }}>
        Add a new song
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <label style={{ display: 'grid', gap: '8px', color: '#cbd5e1' }}>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Song title"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: '8px', color: '#cbd5e1' }}>
            Artist
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist name"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: '8px', color: '#cbd5e1' }}>
            Mood
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
              }}
            >
              {moods.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'grid', gap: '8px', color: '#cbd5e1' }}>
            Audio file
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 18px',
              border: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              color: '#fff',
              background: loading
                ? 'rgba(100, 116, 139, 0.9)'
                : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading
                ? 'none'
                : '0 20px 40px rgba(236, 72, 153, 0.24)',
            }}
          >
            {loading ? 'Uploading...' : 'Add Song'}
          </button>

          {status && (
            <p style={{ margin: 0, color: '#e2e8f0' }}>{status}</p>
          )}
        </div>
      </form>
    </section>
  );
};

export default AddSong;
