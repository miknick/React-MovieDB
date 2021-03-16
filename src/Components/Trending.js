import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
function Trending(props) {
    const [trendingMovies, setTrendingMovies] = useState()
    const randomIndex = Math.floor(Math.random() * 20)

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + process.env.REACT_APP_TMDB_API_KEY)
            .then((response) => response.json())
            .then(response => {
                setTrendingMovies(response.results)

            })
    }, [])
    useEffect(() => {
        if (trendingMovies) {
            props.getRandomMovieImage(trendingMovies[randomIndex].backdrop_path)
        }

    }, [trendingMovies])
    const component = trendingMovies && trendingMovies.map((movie) => {
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
                <Link className="nav-link p-0 m-0" to={{
                    pathname: `/${movie.id}-details`,
                    props: { id: movie.id }
                }}>
                    <h6 className="text-dark" >{movie.original_title}</h6>

                </Link>

            </div >

        )
    })

    return (
        <div>
            <Container>
                <h1 >Trendings</h1>
            </Container>


            <Container className="d-flex overflow-auto " >

                {component}
            </Container>
        </div>

    )
}

export default Trending
