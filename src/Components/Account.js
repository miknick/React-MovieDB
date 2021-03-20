import React, { useState, useEffect } from 'react'
import { Card, Container, Alert, Button } from 'react-bootstrap'
import { useAuth } from "../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { db } from "../firebase"
function Account() {
    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const [profileColor, setProfileColor] = useState()
    const history = useHistory()

    useEffect(() => {
        db.collection("Users").get()
            .then(snapshot => {
                snapshot.forEach(user => {
                    const data = user.data()
                    if (currentUser.email === data.email) {
                        setProfileColor(data.profileColor)
                    }
                })
            })
    }, [])

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
                        <div className="d-flex align-items-center ">
                            <h1 className=" text-light profileImg mt-2 pt-4 text-center"
                                style={{ backgroundColor: profileColor }} >
                                {currentUser && currentUser.email[0].toUpperCase()}</h1>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <h3 className="ml-5  " >
                                {currentUser && currentUser.email.split("@")[0]}
                            </h3>
                        </div>

                        {error && <Alert variant="danger">{error}</Alert>}

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
