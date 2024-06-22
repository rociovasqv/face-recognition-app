
import { Col, Button, Row, Container, Card, Form, Alert, Spinner } from "react-bootstrap";
import loginHooks from "../hooks/useStateLogin";
import { useNavigate } from "react-router-dom";

  
const Login = () => {
  const { email, setEmail, password, setPassword, submmitLogin, error, loading } = loginHooks();
  const navigate = useNavigate();
  
  const onsubmitLogin = async (e) =>
    {
      e.preventDefault();
      try {
        await submmitLogin(e);
        navigate('/home'); // Redirige a la página de inicio)
      } catch (err) {
        console.error("Error en el login:", err);
        navigate('/not-found', { state: { isErrorRole: false, message: err.message } });
      }
    };

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
                {error.error && <Alert variant="danger">{error.message}</Alert>}

                <Form className="mb-3" onSubmit={ onsubmitLogin }>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="text-secondary">
                      Correo electrónico
                    </Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Ingresa correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className="text-secondary">Contraseña</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Ingresar clave" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
                  </Form.Group>

                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="#!">
                        ¿Te olvidaste tu contraseña?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Ingresar"}
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

export default Login;