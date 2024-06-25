import { Col, Button, Row, Container, Card, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import editEmployeeHooks from "../hooks/useEditEmployee";
import { Roles } from "../data/constants";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { employee, setEmployee, loading, setLoading, error, setError, submitEdit } = editEmployeeHooks();

  const onsubmitEdit = async (e) =>
    {
        e.preventDefault();
        try {
          await submitEdit(e);
          navigate('/empleados');
        } catch (err) {
            setError({ error: true, message: err.response?.data?.message || "Error al actualizar" });
            setLoading(false);
            navigate('/not-found', { state: { isErrorRole: false, message: err.message } });
        }
    }

  const onchangeEdit = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  if (loading || !employee ) return <Spinner animation="border" />;

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow-light">
            <Card.Body>
              <div className="mb-3 mt-4 text-dark">
                <h2 className="fw-bold mb-2 text-uppercase">Editar usuario</h2>
                <p className="mb-3 text-primary">¡Por favor, actualice los datos del usuario!</p>
                {error.error && <Alert variant="danger">{error.message}</Alert>}

                <Form className="mb-3" onSubmit={onsubmitEdit}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label className="text-secondary">Nombre/s</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa nombre"
                      name="firstName"
                      value={employee.firstName}
                      onChange={onchangeEdit}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label className="text-secondary">Apellido/s</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa apellido"
                      name="lastName"
                      value={employee.lastName}
                      onChange={onchangeEdit}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="text-secondary">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingresa email"
                      name="email"
                      value={employee.email}
                      onChange={onchangeEdit}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDni">
                    <Form.Label className="text-secondary">DNI</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa DNI"
                      name="dni"
                      value={employee.dni}
                      onChange={onchangeEdit}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label className="text-secondary">Role</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      value={employee.role}
                      onChange={onchangeEdit}
                      required
                    >
                      <option value="">Selecciona un rol</option>
                      {Object.values(Roles).map((roleValue) => (
                        <option key={roleValue} value={roleValue}>
                          {roleValue}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : "Actualizar"}
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

export default EditEmployee;
