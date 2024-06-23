// // // import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// // import './card.css';

// // // const Card = ({ person, onStatusChange }) => {
// // //   const [errorMessage, setErrotMessage] =useState('');
// // //   const history = useHistory();

// // //   const handleRecognition = (isCorrest) => {
// // //      if (isCorrect) {
//       // Maneja el caso de "Correctos" aquí si es necesario
//     } else {
//         setErrorMessage('Datos incorrectos, vuelva a loguearse');
//         history.push({
//           pathname: '/login',
//           state: { errorMessage: 'Datos incorrectos, vuelva a loguearse' }
// // //   });
//         }
//     };

// // //   return (
// // //     <div className="card">
// // //       <h3>{name} {lastName}</h3>
// // //       <p>DNI: {dni}</p>
// // //       <div className={`status ${status}`}>
// // //         {status === 'present' && <span>✔️ Presente</span>}
// // //         {status === 'absent' && <span>❌ Ausente</span>}
// // //       </div>
// // //       los botones dan la funcionalidad que va a la tabla de presentismo. Vienen cuando dan el ok
// // //       <button onClick={() => handleRecognition(true)}>Correctos</button>
//       <button onClick={() => handleRecognition(false)}>Incorrecto</button>
//       {errorMessage && <p>{errorMessage}</p>}
// // //     </div>
// // //   );
// // // };

// // export default Card;
