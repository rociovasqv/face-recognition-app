import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import faceRecognition from "../../api/faceRecognition";
import { dataURLToBlob } from "blob-util";
import Dialog from "../Dialog";
import dailyAttendance from "../../api/dailyAttendance";
import { Button, Spinner } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import Alert from "../Alert";

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
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    recognizeFace(imageSrc);
  }, [webcamRef]);

  const recognizeFace = async (imageSrc) => {
    if (imageSrc) {
      try {
        setLoading(true);
        const blob = dataURLToBlob(imageSrc);
        const formData = new FormData();
        formData.append("image", blob, "capture.jpg");
        const res = await faceRecognition.recognizeFace(formData);
        setRecognitionResult(res.data);
        setShowConfirmation(true);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error recognizing face:", error);
        if (error.response && error.response.status === 404) {
          setErrorMessage("No se encontró ninguna coincidencia.");
        } else if (error.response && error.response.status === 500) {
          setErrorMessage(
            "No se encontró ninguna cara en la foto. Por favor, intente con una foto de mejor calidad."
          );
        } else {
          setErrorMessage(
            "Ocurrió un error al reconocer la cara. Por favor, intente nuevamente."
          );
        }
        setImg(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (person, isConfirm = false) => {
    if (isConfirm) {
      try {
        setLoading(true);
        const response = await dailyAttendance.markUserPresent(person._id);
        if (response.status === 200) {
          setShowConfirmation(false);
          setShowSuccess(true);
          setImg(null);
          setErrorMessage(null);
        } else {
          setErrorMessage("Error al confirmar la presencia.");
        }
      } catch (error) {
        console.error("Error confirming presence:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setShowConfirmation(false);
      setImg(null);
      setRecognitionResult(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {errorMessage && <Alert message={errorMessage} />}
      {!(loading || showConfirmation || showSuccess) && (
        <div className="flex flex-col justify-center justify-center items-center mb-3">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            height={400}
            width={400}
          />
          <Button
            className="flex items-center gap-3 mt-5"
            color="teal"
            onClick={capture}
          >
            <CameraIcon height={25} width={25} />
            Sacar foto
          </Button>
        </div>
      )}
      {img && (
        <div className="relative">
          <img src={img} alt="screenshot" />
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <Spinner color="teal" className="h-10 w-10" />
            </div>
          )}
        </div>
      )}
      {showConfirmation && recognitionResult && (
        <Dialog
          person={recognitionResult}
          onStatusChange={handleStatusChange}
          show={showConfirmation}
          setShow={setShowConfirmation}
          isSuccess={false}
        />
      )}
      {showSuccess && (
        <Dialog
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
  );
};

export default Videocam;
