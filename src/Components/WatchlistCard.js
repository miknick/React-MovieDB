import React, { useEffect, useState } from 'react'
import { Card, Button, Container } from "react-bootstrap"
function WatchlistCard(props) {
    const [movie, setMovie] = useState()
    useEffect(() => {
        {
            fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
                .then(response => response.json())
                .then(response => setMovie(response))
        }

    }, [])
    const component = () => {

        return (

            <Card id="watchlistCard"
                className="mt-2 flex-row ">
                <Card.Img className="watchlistImg align-self-center" src={`https://www.themoviedb.org/t/p/w500/${movie.poster_path}`} ></Card.Img>
                <Card.Body className="" >

                    <h1>{movie.original_title} </h1>
                    <p className="mb-1  watchlistOverview" >{movie.overview} </p>
                </Card.Body>
                <div className="align-self-end" >
                    <Button onClick={() => { props.handleRemove(movie.id) }}
                        variant="outline-danger"
                        className="  mb-1 mx-2 float-right"
                        round >Remove</Button>

                </div>
            </Card>
        )
    }
    return (
        <Container>
            { movie ? component() : "Loading"}

        </Container>
    )
}

export default WatchlistCard
