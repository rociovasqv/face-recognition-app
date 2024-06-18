import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";

const Videocam = () => {

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
    audio: false
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

export default Videocam;