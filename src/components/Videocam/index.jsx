import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
// import faceRecognitionService from "../../../server/services/faceRecognition.service";

// const Videocam = () => {
//   const videoConstraints = {
//     width: 390,
//     height: 390,
//     facingMode: "user",
//     audio: false,
//   };

//   const webcamRef = useRef(null);
//   const [img, setImg] = useState(null);
//   const [faces, setFaces] = useState([]);

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri('../server/weights');
//       await faceapi.nets.faceLandmark68Net.loadFromUri('../server/weights');
//       await faceapi.nets.faceRecognitionNet.loadFromUri('../server/weights');
//       await faceapi.nets.faceExpressionNet.loadFromUri('../server/weights');
//     };
//     loadModels();
//   }, []);

//   const capture = useCallback(async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImg(imageSrc);

//     if (imageSrc) {
//       const imgElement = new Image();
//       imgElement.src = imageSrc;
//       imgElement.onload = async () => {
//         const detections = await faceapi.detectAllFaces(
//           imgElement,
//           new faceapi.TinyFaceDetectorOptions()
//         ).withFaceLandmarks().withFaceExpressions();
//         setFaces(detections);
//       };
//     }
//   }, [webcamRef]);

//   return (
//     <div>
//       <div>
//         <Webcam
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           height={400}
//           width={400}
//         />
//         <button onClick={capture}>Capture photo</button>
//       </div>
//       <div>
//         {img && <img src={img} alt="screenshot" />}
//         {img && <button onClick={() => setImg(null)}>Recapture</button>}
//         {faces.length > 0 && (
//           <div>
//             <h3>Detected Faces:</h3>
//             <ul>
//               {faces.map((face, index) => (
//                 <li key={index}>Face {index + 1}: {JSON.stringify(face.expressions)}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const Videocam = () => {
  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
    audio: false,
  };

  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

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

// const Videocam = () => {

//   //Restricciones (atributos de la webcam)

//   const videoConstraints = {
//     width: 390,
//     height: 390,
//     facingMode: "user",
//     audio: false
//   };

//   const webcamRef = useRef(null);
//   const [img, setImg] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [modelsLoaded, setModelsLoaded] = useState(false);

//     //Cargar los modelos de face-api.js
//     useEffect(() => {
//       const loadModels = async () => {
//         await faceRecognitionService.loadModels();
//         setModelsLoaded(true);
//       };
//       loadModels();
//     }, []);

// //Captura de foto
//     const capture = useCallback(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setImg(imageSrc);
//     }, [webcamRef]);
  
//     const recognizeFace = useCallback(async () => {
//       if (img) {
//         try {
//           const response = await fetch(img);
//           const blob = await response.blob();
//           const imagePath = URL.createObjectURL(blob);
//           const recognizedUserId = await faceRecognitionService.recognizeFace(imagePath);
//           setUserId(recognizedUserId);
//         } catch (error) {
//           console.error("Error al reconocer el rostro:", error);
//           setUserId(null);
//         }
//       }
//     }, [img]);

//     useEffect(() => {
//       if (img) {
//         recognizeFace();
//       }
//     }, [img, recognizeFace]);
  
//   return (
//     <div>
//       <div>
//         <Webcam
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           height={400}
//           width={400}
//         />
//         <button onClick={capture} disabled={!modelsLoaded}>Capture photo</button>
//       </div>
//       <div>
//         {img && <img src={img} alt="screenshot" />}
//         {userId && <div>El ID de usuario detectado: {userId}</div>}
//         {userId === null && <div>Rostro no detectado</div>}
//         {img && <button onClick={() => setImg(null)}>Recapture</button>}
//       </div>
//     </div>
//   );
// };

export default Videocam;