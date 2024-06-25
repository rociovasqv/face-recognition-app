import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import faceRecognition from "../../api/faceRecognition";
import { dataURLToBlob } from "blob-util";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../Card";
import dailyAttendance from "../../api/dailyAttendance";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Realizar la captura de foto
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    recognizeFace(imageSrc);
  }, [webcamRef]);

  // Llamar a la api de reconocimiento facial
  const recognizeFace = async (imageSrc) => {
    if (imageSrc) {
      try {
        const blob = dataURLToBlob(imageSrc);
        const formData = new FormData();
        formData.append('image', blob, 'capture.jpg');
        const res = await faceRecognition.recognizeFace(formData);
        setRecognitionResult(res.data);
        setShowConfirmation(true);
      } catch (error) {
        console.error("Error recognizing face:", error);
      }
    }
  };

  const handleStatusChange = async (person, isConfirm = false) => {
    if (isConfirm) {
      try {
        const response = await dailyAttendance.markUserPresent(person._id);
        if (response.status === 200) {
          setShowConfirmation(false);
          setShowSuccess(true)
          setImg(null);
        } else {
          setErrorMessage('Error al confirmar la presencia.');
        }
      } catch (error) {
        console.error("Error confirming presence:", error);
      }
    } else {
      setShowConfirmation(false);
      setImg(null);
      setRecognitionResult(null); 
    }
  };

  return (
    <div className="d-flex-wrap justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="mb-3">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            height={400}
            width={400}
          />
        </div>
        <button className="btn btn-primary p-3 mb-3" onClick={capture}>Sacar foto</button>
        <div className="d-flex-wrap justify-content-center">
          {img && <img src={img} alt="screenshot" className="img-thumbnail mb-4" />}
        </div>
        {img && !showConfirmation && <button className="btn btn-secondary p-3 mb-4" onClick={() => setImg(null)}>Recapture</button>}
        {showConfirmation && recognitionResult && (
          <Card person={recognitionResult} onStatusChange={handleStatusChange} show={showConfirmation} setShow={setShowConfirmation} isSuccess={false} />
        )}
        {showSuccess && (
          <Card
            person={recognitionResult}
            onStatusChange={() => {
              setShowSuccess(false);
              setRecognitionResult(null);
            }}
            show={showSuccess}
            setShow={setShowSuccess}
            isSuccess={true}
          />
        )}
      </div>
    </div>
  );
};

export default Videocam;
