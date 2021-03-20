import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth, } from "../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 15))];
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value)
            return setError("Passwords do not match ")
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            db.collection("Users")
                .add({
                    email: emailRef.current.value,
                    watchlist: [],
                    ratings: [],
                    profileColor: color
                })
            setLoading(false)
            history.push("/")
        }
        catch {
            setError("Failed to create account")
        }
    }
    return (
        <Container className="d-flex justify-content-center  align-items-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4" >Sign up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mt-2">
                                <Form.Control ref={emailRef} required type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Control ref={passwordRef} required type="password" placeholder="Enter password" />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Control ref={passwordConfirmRef} required type="password"
                                    placeholder="Enter password again" />
                            </Form.Group>
                            <Button disabled={loading} variant="info" type="submit">Submit </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2" >
                    <h2>Already have an account? <Link className=" text-info"
                        to="/login">Login</Link></h2>
                </div>

            </div>
        </Container >
    )
}

export default Signup
