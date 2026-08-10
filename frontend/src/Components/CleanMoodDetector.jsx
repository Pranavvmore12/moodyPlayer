import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';

// Map raw mood keys to display labels with emojis
const EMOJI_MAP = {
  happy: 'Happy',
  sad: 'Sad',
  angry: 'Angry',
  fearful: 'Fearful',
  disgusted: 'Disgusted',
  surprised: 'Surprised',
  neutral: 'Neutral',
};

export default function CleanMoodDetector() {
  const videoRef = useRef(null);
  
  // App State
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedMood, setDetectedMood] = useState('');
  const [cameraError, setCameraError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ----------------------------------------------------
  // HELPER FUNCTIONS
  // ----------------------------------------------------

  // 1. Load Face-API models
  const loadFaceApiModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      setModelsLoaded(true);
    } catch (err) {
      console.error('Failed to load models:', err);
      setCameraError('Failed to load AI models.');
    }
  };

  // 2. Request and attach webcam stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Webcam error:', err);
      setCameraError('Camera access denied or unavailable.');
    }
  };

  // 3. Stop webcam tracks (Cleanup)
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // 4. Calculate the mood with the highest confidence score
  const getDominantMood = (expressions) => {
    const primaryKey = Object.keys(expressions).reduce((prev, current) =>
      expressions[prev] > expressions[current] ? prev : current
    );
    return EMOJI_MAP[primaryKey] || primaryKey;
  };

  // 5. Detect mood from current video frame
  const analyzeCurrentFrame = async () => {
    if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
      return;
    }

    setIsAnalyzing(true);

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const moodResult = getDominantMood(detection.expressions);
        setDetectedMood(moodResult);
      } else {
        setDetectedMood('No face detected. Try again.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setDetectedMood('Error detecting mood.');
    } finally {
      setIsAnalyzing(false);
    }
    console.log('Detected Mood:', detectedMood);
  };

  // ----------------------------------------------------
  // REACT LIFECYCLE HOOKS
  // ----------------------------------------------------

  // Step 1: Load models on initial render
  useEffect(() => {
    loadFaceApiModels();
  }, []);

  // Step 2: Start camera once models are ready
  useEffect(() => {
    if (modelsLoaded) {
      startWebcam();
    }
    return () => stopWebcam();
  }, [modelsLoaded]);

  // ----------------------------------------------------
  // RENDER UI
  // ----------------------------------------------------
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      

      {!modelsLoaded ? (
        <p>Loading AI models...</p>
      ) : cameraError ? (
        <p style={{ color: 'red' }}>{cameraError}</p>
      ) : (
        <div>
          {/* Webcam Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="640"
            height="480"
            style={{ borderRadius: '12px', transform: 'scaleX(-1)', backgroundColor: '#000' }}
          />

          {/* Action Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={analyzeCurrentFrame}
              disabled={isAnalyzing}
              style={{
                padding: '12px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: isAnalyzing ? '#888' : '#0070f3',
                border: 'none',
                borderRadius: '8px',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Detect Mood'}
            </button>
          </div>

          {/* Minimal Mood Text Output Only */}
          {detectedMood && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '24px', margin: 0 }}>
                Mood: <span style={{ color: '#0070f3' }}>{detectedMood}</span>
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}