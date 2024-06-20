import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import faceRecognition from "../../api/faceRecognition";

const Videocam = () => {
  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
    audio: false,
  };

  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  // Guardar la captura de foto
  const saveCaptured = async (image) => {
    try {
      const response = await fetch('/api/saveCaptured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      if (!response.ok) {
        throw new Error('Error saving captured image');
      }
      console.log('Capture history saved successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Llamar a la api de reconocimiento facial con useEffect
  useEffect(() => {
    const recognizeFace = async () => {
      if (img) {
        try {
          const res = await faceRecognition.recognizeFace({ image: img });
          setRecognitionResult(res.data);
          await saveCaptured(img);
        } catch (error) {
          console.error("Error recognizing face:", error);
        }
      }
    };
    recognizeFace();
  }, [img]);

  return (
    <div>
      <div>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          height={400}
          width={400}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
      <div>
        {img && <img src={img} alt="screenshot" />}
        {img && <button onClick={() => setImg(null)}>Recapture</button>}
      </div>
    </div>
  );
};

export default Videocam;
