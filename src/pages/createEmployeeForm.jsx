import React from "react";
import { Col, Button, Row, Container, Card, Form, Alert, Spinner } from "react-bootstrap";
import createEmployeeHooks from "../hooks/useCreateEmployee";
import { useNavigate } from "react-router-dom";
import { Roles } from "../data/constants";

const CreateEmployee = () =>
    {
        const { firstName, setFirstName, 
            lastName, setLastName, 
            email, setEmail, 
            dni, setDni, 
            password, setPassword,
            image, setImage,
            role, setRole,
            loading, setLoading,
            error, setError, submitCreate } = createEmployeeHooks();
        
        const navigate = useNavigate();
        const onsubmitCreate = async (e) =>
            {
                e.preventDefault();
                try {
                  await submitCreate(e);
                  navigate('/employees'); // Redirige a la página de inicio
                } catch (err) {
                    setError({ error: true, message: err.response?.data?.message || "Error al crear usuario" });
                    setLoading(false);
                    navigate('/not-found', { state: { isErrorRole: false, message: err.message } });
                }
            }

        return (
            <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center mt-5 mb-5">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow-light">
                        <Card.Body>
                            <div className="mb-3 mt-4 text-dark">
                                <h2 className="fw-bold mb-2 text-uppercase">nuevo usuario</h2>
                                <p className=" mb-3 text-primary">¡Por favor, rellene los datos para crear el usuario!</p>
                                {error.error && <Alert variant="danger">{error.message}</Alert>}

                                <Form className="mb-3" onSubmit={onsubmitCreate}>

                                        <Form.Group className="mb-3" controlId="formFirstName">
                                        <Form.Label className="text-secondary">
                                            Nombre/s
                                        </Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa nombre"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label className="text-secondary">
                                            Apelido/s
                                        </Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Ingresa apellido"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} required/>
                                        </Form.Group>
                                        
                                        <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="text-secondary">
                                            Email
                                        </Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Ingresa email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formDni">
                                        <Form.Label className="text-secondary">DNI</Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Ingresa DNI"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formRole">
                                        <Form.Label className="text-secondary">Rol</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="" className="text-secondary">Selecciona un rol</option>
                                            {Object.values(Roles).map((roleValue) => (
                                            <option key={roleValue} value={roleValue} className="text-secondary">
                                                {roleValue}
                                            </option>
                                            ))}
                                        </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formImage">
                                            <Form.Label className="text-secondary">Image</Form.Label>
                                            <Form.Control type="file" value={image} onChange={(e) => setImage(e.target.files[0])} />
                                        </Form.Group>


                                        <Form.Group className="mb-3" controlId="formNewPassword">
                                        <Form.Label className="text-secondary">Contraseña</Form.Label>
                                        <Form.Control 
                                        type="password"
                                        placeholder="Ingresar la nueva clave" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} required/>
                                        </Form.Group>

                                        <div className="mb-3">
                                        <p className="small text-secondary">
                                            ¿Ya te registraste? {""}
                                            <a className="text-primary" href="/login">
                                            Iniciar sesión
                                            </a>
                                        </p>
                                        </div>
                                        <div className="d-grid">
                                        <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : "Crear"}
                                        </Button>
                                        </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
            </div>
        )
    }
    export default CreateEmployee;