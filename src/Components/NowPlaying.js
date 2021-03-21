import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
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
        const imgUrl = movie.poster_path
            ? `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`
            : process.env.PUBLIC_URL + "/placeholder.png"
        return (
            <div className="mr-2 text-center " key={movie.id} >
                <Link to={{
                    pathname: `/details-${movie.id}`,
                }}>
                    <LazyLoadImage
                        className=" homeCard rounded"
                        effect="blur"
                        placeholderSrc={process.env.PUBLIC_URL + "/placeholder.png"}
                        src={imgUrl}
                        alt={movie.original_title}>
                    </LazyLoadImage>

                </Link>
                <h6>{movie.vote_average === 0 ? movie.release_date
                    : movie.vote_average}</h6>
                <Link className="nav-link p-0 m-0" to={{
                    pathname: `/details-${movie.id}`,
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
