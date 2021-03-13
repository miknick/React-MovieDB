import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from "react-router-dom"
import Cast from './Cast'
function MovieDetails() {
    const location = useLocation()
    const [movie, setMovie] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [backgroundImg, setBackgroundImg] = useState()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${location.props.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                setImgUrl("https://image.tmdb.org/t/p/w500/" + response.poster_path)
                setBackgroundImg("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + response.backdrop_path)
                // `linear-gradient(to right, rgba(${primaryColor.join()}, 1.00) 150px, rgba(${primaryColor.join()}, 0.84) 50%)
                // ,url(${backgroundImg})`
                setMovie(response)
            })
    }, [location])

    function handleRuntime(num) {
        if (num < 60)
            return (`${num}m`)
        const hour = Math.floor(num / 60)
        const minute = num % 60
        return (minute === 0 ? `${hour}h` : `${hour}h ${minute}m`)
    }

    const component = () => {
        const genresName = movie.genres.map(genre => { return genre.name })
        return (
            <div>
                <Container fluid style={{ backgroundImage: `url(${backgroundImg})` }}
                    className="backgroundImg pl-0  detailsCard mb-4  ">
                    <Row className="movieInfoCard text-light ml-auto d-flex align-items-center" >
                        <Col md="auto" className="my-4" >
                            <img className="detailsImg rounded" src={imgUrl} alt="" />
                        </Col>
                        <Col >
                            <Row >
                                <h1>{`${movie.original_title}`}</h1>
                                <h1 className="text-white-50">{`(${movie.release_date.split("-")[0]})`}</h1>

                            </Row>
                            <Row className="ml-1">
                                <h5 >{movie.vote_average} |</h5>
                                <h5 className="mx-1" >{genresName.join(",")} |</h5>
                                <h5 >{handleRuntime(movie.runtime)}</h5>

                            </Row>

                            <h5 className="text-white-50 ml-1" >{movie.tagline}</h5>
                            <h5>Overview</h5>
                            <p >{movie.overview} </p>
                        </Col>
                    </Row>


                </Container>
                <Cast id={movie.id} ></Cast>
            </div >

        )
    }
    return (
        <div>
            {movie ? component() : "Loading"}
        </div>
    )
}

export default MovieDetails
