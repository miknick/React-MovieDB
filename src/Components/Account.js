import React, { useState } from 'react'
import { Card, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from "../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
function Account() {
    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    async function handleLogOut() {
        setError("")
        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <Container className="d-flex align-items-center justify-content-center "
            style={{ minHeight: "100vh" }} >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2>Profile:</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:</strong> {currentUser && currentUser.email}

                    </Card.Body>
                    <Button onClick={handleLogOut}>
                        Logout
                        </Button>
                </Card>
            </div>

        </Container>

    )
}

export default Account
