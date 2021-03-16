import React, { useState, useRef } from 'react'
import { Card, Form, Button, Container, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch {
            setError("Failed to login")
        }
        setLoading(false)
    }
    return (
        <div>
            <Container className="d-flex justify-content-center  align-items-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4" > Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mt-2">
                                    <Form.Control ref={emailRef} required type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <Form.Control ref={passwordRef} required type="password" placeholder="Enter password" />
                                </Form.Group>
                                <Button disabled={loading} variant="info" type="submit">Submit </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2" >
                        <h2>Do not have an account? <Link className=" text-info"
                            to="/signup">Sign Up</Link></h2>
                    </div>

                </div>
            </Container>

        </div>
    )
}

export default Login
