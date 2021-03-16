import { Navbar, Nav, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"
import React from "react"
function BasicNavbar(props) {
    const { currentUser } = useAuth()
    return (
        <Navbar className="top " bg="dark">
            <Link to="/" className="nav-link  text-light">RMDB</Link>
            <Nav className="ml-auto  ">

                <Link to="/" className="nav-link  text-light">Home</Link>

                {currentUser ?
                    <div className="d-flex">
                        <Link className="nav-link  text-light" to="/account">Account</Link>
                        <Link to="/watchlist" className="nav-link text-light" > Watchlist</Link>

                    </div>

                    : <div className="d-flex" >
                        <Link replace className="nav-link  text-light" to="/login">Login</Link>
                        <Link replace className="nav-link  text-light" to="/signup">Sign Up</Link>

                    </div>}




            </Nav>
        </Navbar>
    )

}
export default BasicNavbar