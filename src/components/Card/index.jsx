import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./styles.css";

const Card = ({ person, onStatusChange, show, setShow, isSuccess }) => {
  const handleClose = () => setShow(false);
  
  const handleRecognition = (isCorrect) => {
    onStatusChange(person, isCorrect);
    setShow(false);
  };

  const fullName = `${person.firstName} ${person.lastName}`;

 return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSuccess ? 'Presencia Confirmada' : 'Confirmación de Identidad'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isSuccess ? (
          <div className="alert alert-success mt-4" role="alert">
            Tenes el presente {fullName}
          </div>
        ) : (
          <>
            <h3>Sos {fullName}?</h3>
            <p>DNI: {person.dni}</p>
          </>
        )}
      </Modal.Body>
      {!isSuccess && (
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleRecognition(false)}>Incorrecto</Button>
          <Button variant="primary" onClick={() => handleRecognition(true)}>Correcto</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Card;