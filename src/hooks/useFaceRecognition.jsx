// import { useEffect, useState } from "react";
// import * as faceapi from "face-api.js";

// //Crear el estado de reconocimiento facial
// const useFaceRecognition = () =>
//     {
//         const [faces, setFaces] = useState([]);
        
//         //Cargar los modelos de face-api.js
//         useEffect(
//             () => {
//                 const loadModelsFace = async () =>
//                     {
//                         await faceapi.nets.tinyFaceDetector.loadFromUri('../server/weights');
//                         await faceapi.nets.faceLandmark68Net.loadFromUri('../server/weights');
//                         await faceapi.nets.faceRecognitionNet.loadFromUri('../server/weights');
//                         await faceapi.nets.faceExpressionNet.loadFromUri('../server/weights');
//                     };
//                     loadModelsFace();
//             }
//         )


//     }