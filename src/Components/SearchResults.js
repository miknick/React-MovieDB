import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom"
import SearchBar from "./SearchBar"
import { LazyLoadImage } from "react-lazy-load-image-component"
import LoadingScreen from "react-loading-screen"
import 'react-lazy-load-image-component/src/effects/blur.css';

function SearchResults() {
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setSearchTerm(location.pathname.split("-")[1])
    }, [location])
    const [movies, setMovies] = useState()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`)
            .then(response => response.json())
            .then(response => {
                setMovies(response.results)
                setLoading(false)
            })
    }, [searchTerm])
    const component = movies && movies.map(movie => {
        return (
            <Card key={movie.id} className=" overflow-hidden searchCard mt-2  flex-row 
            ">
                <Link to={{
                    pathname: `/details-${movie.id}`,
                }} >
                    <LazyLoadImage
                        className="searchImg"
                        src={movie.poster_path
                            ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                            : process.env.PUBLIC_URL + "/placeholder.png"}
                        effect="blur"
                        placeholderSrc={process.env.PUBLIC_URL + "/placeholder.png"}
                        alt={movie.original_title + " Poster"} />
                </Link>

                <Card.Body  >
                    <Link className="nav-link p-0 m-0" to={{
                        pathname: `/details-${movie.id}`,
                    }}>
                        <h4 className="text-dark" >{movie.original_title}</h4>
                    </Link>
                    <p style={{ fontSize: "1.2rem" }} className="text-muted">
                        {movie.release_date}</p>


                </Card.Body>


            </Card>
        )
    })
    return (
        <LoadingScreen loading={loading}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            text='Loading'
        >

            <Container fluid ><SearchBar styleClass="resultsForm" ></SearchBar>
            </Container>
            <Container>
                <h1>{component}</h1>

            </Container>
        </LoadingScreen>



    )
}

export default SearchResults
