import React from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export default function Login() {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow-light">
            <Card.Body>
              <div className="mb-3 mt-4 text-dark">
                <h2 className="fw-bold mb-2 text-uppercase">Iniciar sesión</h2>
                <p className=" mb-3 text-primary">¡Por favor, ingresa tu correo y contraseña!</p>

                <Form className="mb-3">
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="text-secondary">
                      Correo electrónico
                    </Form.Label>
                    <Form.Control type="email" placeholder="Ingresa correo" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className="text-secondary">Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingresar clave" />
                  </Form.Group>

                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="#!">
                        ¿Te olvidaste tu contraseña?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Ingresar
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}