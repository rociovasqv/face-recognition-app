import React, { useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { AuthContext } from "../contexts/authContext";
import { Roles } from "../data/constants";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const admitedRoles = [Roles.SUPERVISOR, Roles.MANAGER, Roles.HR];

  const goToPresentismo = () => {
    navigate("/presentismo");
  };

  const goToUsuarios = () => {
    navigate("/empleados");
  };

  const goToListadoPresentismo = () => {
    navigate("/listado-presentismo");
  };

  return (
    <Container>
      <div className="homeHeader">
        <h1>Home</h1>
        <p>Bienvenido al Home!</p>
      </div>
      <Row className="cardContainer">
        <Col md={4} className="d-flex">
          <Card
            className="homeCard align-items-stretch"
            onClick={goToPresentismo}
          >
            <Card.Body>
              <Card.Title>Presentismo</Card.Title>
              <Card.Text>
                Pone el presente laboral utilizando reconocimiento facial con nuestra IA
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {admitedRoles.includes(user?.role) && (
          <>
            <Col md={4} className="d-flex">
              <Card
                className="homeCard align-items-stretch"
                onClick={goToUsuarios}
              >
                <Card.Body>
                  <Card.Title>Empleados</Card.Title>
                  <Card.Text>Gestión y administración de cuentas de empleados.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex">
              <Card
                className="homeCard align-items-stretch"
                onClick={goToListadoPresentismo}
              >
                <Card.Body>
                  <Card.Title>Listado de Presentismo</Card.Title>
                  <Card.Text>
                    Ver registros de asistencias e inasistencias
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Home;