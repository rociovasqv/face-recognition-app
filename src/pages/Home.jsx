import React from 'react';
import Videocam from "../components/Videocam/index";
import "../styles/home.css";

function Home() {
  return (
    <div>
      
      <div className='homeHeader'>
      <h1>Home</h1>
      <p>Bienvenido al Home!</p>
      </div>
      <div className='homeBody'>
      <Videocam/>
      </div>
    </div>
  );
}

export default Home;