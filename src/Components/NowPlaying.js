import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
function NowPlaying() {
    const [nowPlaying, setNowPlaying] = useState()
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=" + process.env.REACT_APP_TMDB_API_KEY)
            .then((response) => response.json())
            .then(response => {
                setNowPlaying(response.results)
            })
    }, [])
    const component = nowPlaying && nowPlaying.map((movie) => {
        const imgUrl = ("https://image.tmdb.org/t/p/w500/" + movie.poster_path)

        return (
            <div className="mr-2 " key={movie.id} >
                <Link to={{
                    pathname: `/${movie.id}-details`,
                    props: { id: movie.id }
                }}>
                    <img className="homeCard rounded" src={imgUrl} alt={movie.original_title}></img>
                </Link>
                <h6>{movie.vote_average === 0 ? movie.release_date
                    : movie.vote_average}</h6>
                <Link to={{
                    pathname: `/${movie.id}-details`,
                    props: { id: movie.id }
                }}>
                    <h6 className="text-dark" >{movie.original_title}</h6>

                </Link>

            </div>

        )
    })

    return (
        <div>
            <Container>
                <h1  >Now In Theaters</h1>
            </Container>
            <Container className="d-flex overflow-auto " >
                {component}
            </Container>
        </div>


    )
}

export default NowPlaying
