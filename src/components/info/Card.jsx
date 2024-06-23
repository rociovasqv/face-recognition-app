// // import React, { useState } from 'react';
// import './card.css';

// // const Card = ({ person, onStatusChange }) => {
// //   const { name, lastName, dni } = person;
// //   const [status, setStatus] = useState(null);

// //   const handleRecognition = (isRecognized) => {
// //     setStatus(isRecognized ? 'present' : 'absent');
// //     onStatusChange(person, isRecognized);
// //   };

// //   return (
// //     <div className="card">
// //       <h3>{name} {lastName}</h3>
// //       <p>DNI: {dni}</p>
// //       <div className={`status ${status}`}>
// //         {status === 'present' && <span>✔️ Presente</span>}
// //         {status === 'absent' && <span>❌ Ausente</span>}
// //       </div>
// //       los botones dan la funcionalidad que va a la tabla de presentismo. Vienen cuando dan el ok
// //       <button onClick={() => handleRecognition(true)}>Presente</button>
// //       <button onClick={() => handleRecognition(false)}>Ausente</button>
// //     </div>
// //   );
// // };

// export default Card;
