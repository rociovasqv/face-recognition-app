import { Link } from "react-router-dom";

export default function NotFound({ isErrorRole = false }) {
  return (
    <>
      <main>
        <p>Error 404</p>
        <h1>
          {isErrorRole ? "Acceso denegado" : "Oh! Creo que te perdiste..."}
        </h1>
        <p>
        {
            isErrorRole
            ? "Tu usuario no tiene los permisos para acceder a esta ruta."
            : "Al parecer la página a la cual intentaste acceder no existe."
        }
        </p>
        <div>
          <Link to="/">Volver al inicio</Link>
        </div>
      </main>
    </>
  );
}