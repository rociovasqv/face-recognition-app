import React from "react";
import {
  Button,
  Dialog as DialogMaterial,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const Dialog = ({ person, onStatusChange, show, setShow, isSuccess }) => {
  const handleShow = () => setShow(!show);

  const handleRecognition = (isCorrect) => {
    onStatusChange(person, isCorrect);
    setShow(false);
  };

  const fullName = `${person.firstName} ${person.lastName}`;

  return (
    <DialogMaterial
      open={show}
      handler={handleShow}
      className={`${isSuccess ? "bg-green-500" : "bg-midnight"}`}
    >
      <DialogHeader>
        {!isSuccess && (
          <Typography
            variant="h5"
            color="white"
            className={`${isSuccess ? "" : "text-slate"}`}
          >
            Confirmación de Identidad
          </Typography>
        )}
      </DialogHeader>
      <DialogBody className="grid place-items-center gap-4">
        {isSuccess ? (
          <Typography color="white" variant="h3">
            Tenes el presente {fullName}
          </Typography>
        ) : (
          <>
            <Typography variant="h3" className="text-teal-500">
              ¿Sos {fullName}?
            </Typography>
            <Typography variant="h5" className="text-teal-500 text-center">
              DNI: {person.dni}
            </Typography>
          </>
        )}
      </DialogBody>

      {isSuccess ? (
        <DialogFooter></DialogFooter>
      ) : (
        <DialogFooter className="space-x-2">
          <Button
            color="red"
            variant="gradient"
            onClick={() => handleRecognition(false)}
          >
            Incorrecto
          </Button>
          <Button
            color="green"
            variant="gradient"
            onClick={() => handleRecognition(true)}
          >
            Correcto
          </Button>
        </DialogFooter>
      )}
    </DialogMaterial>
  );
};

export default Dialog;