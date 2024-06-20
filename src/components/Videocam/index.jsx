import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import faceRecognition from "../../api/faceRecognition";
import { dataURLToBlob } from "blob-util";

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
    recognizeFace(imageSrc);
  }, [webcamRef]);

  // Llamar a la api de reconocimiento facial con useEffect
    const recognizeFace = async (imageSrc) => {
      if (imageSrc) {
        try {
        const blob = dataURLToBlob(imageSrc);
        const formData = new FormData();
        formData.append('image', blob, 'capture.jpg');
          const res = await faceRecognition.recognizeFace(formData);
          setRecognitionResult(res.data);
        } catch (error) {
          console.error("Error recognizing face:", error);
        }
      }
    };

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
