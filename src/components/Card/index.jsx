import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correcto para v6
import './styles.css';

const Card = ({ person, onStatusChange }) => {
  const [errorMessage, setErrorMessage] = useState(''); // Corrección de setErrotMessage a setErrorMessage
  const navigate = useNavigate(); // Cambio de useHistory a useNavigate

  const handleRecognition = (isCorrect) => {
    if (isCorrect) {
      onStatusChange(person, 'present');
    } else {
      setErrorMessage('Datos incorrectos, vuelva a loguearse');
      navigate('/login', {
        state: { errorMessage: 'Datos incorrectos, vuelva a loguearse' },
      });
    }
  };

  return (
    <div className="card">
      <h3>{person.name} {person.lastName}</h3>
      <p>DNI: {person.dni}</p>
      <div className={`status ${person.status}`}>
        {person.status === 'present' && <span>✔️ Presente</span>}
        {person.status === 'absent' && <span>❌ Ausente</span>}
      </div>
      <button onClick={() => handleRecognition(true)}>Correctos</button>
      <button onClick={() => handleRecognition(false)}>Incorrecto</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Card;