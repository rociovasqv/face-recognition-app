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

//Realizar la captura de foto
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  //Función para convertir la imagen base 64 a Blob (objeto binario) para guardarla como un archivo al ser llamado por el backend, de forma temporal
  const dataBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);  //Permite descodificar una cadena de datos en base-64 a una cadena binaria
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];  //Extraer el tipo MIME de la imagen (por ejemplo: image/jpg, image/png, etc)

    const buffer = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeString });
  };

  // Guardar la captura de foto
  const saveCaptured = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', dataBlob(image), 'capture.jpg');

      const response = await fetch('/api/saveCaptured', {
        method: 'POST',
        body: formData,
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
