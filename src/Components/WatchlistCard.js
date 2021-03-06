import React, { useEffect, useState } from 'react'
import { Card, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

function WatchlistCard(props) {
    const [movie, setMovie] = useState()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(response => setMovie(response))
    }, [props.id])
    function handleRuntime(num) {
        if (num < 60)
            return (`${num}m`)
        const hour = Math.floor(num / 60)
        const minute = num % 60
        return (minute === 0 ? `${hour}h` : `${hour}h ${minute}m`)
    }

    const component = () => {
        const genresName = movie.genres.map(genre => { return genre.name })
        const imgUrl = movie.poster_path
            ? `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`
            : process.env.PUBLIC_URL + "/placeholder.png"
        return (
            <Card id="watchlistCard"
                className="mt-2 flex-row ">
                <Link className="align-self-center" to={`details-${movie.id}`}>
                    <LazyLoadImage
                        placeholderSrc={process.env.PUBLIC_URL + "/placeholder.png"}
                        effect="blur"
                        className=" watchlistImg "
                        alt={movie.original_title + " poster"}
                        src={imgUrl} ></LazyLoadImage>
                </Link>
                <Card.Body className="" >
                    <Link className="nav-link text-dark p-0" to={`details-${movie.id}`}>
                        <h1>{movie.original_title} </h1>

                    </Link>
                    <div id="watchlistInfo" className="d-flex " >
                        <h5 >{movie.vote_average}</h5>
                        <h5  >|{genresName.join(",")}|</h5>
                        <h5 >{handleRuntime(movie.runtime)}</h5>

                    </div>

                    <p className="mb-1  watchlistOverview" >{movie.overview} </p>

                </Card.Body>
                <div className="align-self-end" >
                    <Button onClick={() => { props.handleRemove(movie.id) }}
                        variant="outline-danger"
                        className="  mb-1 mx-2 float-right"
                    >Remove</Button>

                </div>
            </Card>
        )
    }
    return (
        <Container>
            { movie ? component() : ""}

        </Container>
    )
}

export default WatchlistCard
