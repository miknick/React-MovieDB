import React, { useEffect, useState } from 'react'
import { Card, Col, CardImg, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom"
import SearchBar from "./SearchBar"
function SearchResults() {
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState()
    useEffect(() => {
        setSearchTerm(location.pathname.split("-")[1])
    }, [location])
    const [movies, setMovies] = useState()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`)
            .then(response => response.json())
            .then(response => setMovies(response.results))
    }, [searchTerm])
    const component = movies && movies.map(movie => {
        return (
            <Card key={movie.id} className=" overflow-hidden searchCard mt-2  flex-row 
            ">
                <Link to={{
                    pathname: `/${movie.id}-details`,
                    props: { id: movie.id }
                }} >
                    <Card.Img
                        className="searchImg"
                        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                        alt={movie.original_title + " Poster"} />
                </Link>

                <Card.Body  >
                    <Link className="nav-link p-0 m-0" to={{
                        pathname: `/${movie.id}-details`,
                        props: { id: movie.id }
                    }}>

                        <h4 className="text-dark" >{movie.original_title}</h4>
                    </Link>
                    <p style={{ fontSize: "1.2rem" }} className="text-muted">
                        {movie.release_date}</p>


                </Card.Body>


            </Card >
        )
    })
    return (
        <div>
            <Container fluid ><SearchBar styleClass="resultsForm" ></SearchBar>
            </Container>
            <Container>
                <h1>{component}</h1>

            </Container>


        </div>

    )
}

export default SearchResults
