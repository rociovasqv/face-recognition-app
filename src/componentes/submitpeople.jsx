import React, { useState, useRef } from 'react';
import axios from 'axios';

const Usuario = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleCapture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    try {
      await axios.post('/api/people', { name, age, imageData });
      console.log('Data submitted successfully!');
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  return (
    <div>
      <h1>Webcam Capture</h1>
      <video ref={videoRef} autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleCapture}>Capture</button>
    </div>
  );
};

export default Usuario;
