import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useHistory, useLocation } from "react-router-dom"
import Cast from './Cast'
import { useAuth } from "../Contexts/AuthContext"
import { db } from "../firebase"
import StarRating from "./StarRating"
import LoadingScreen from "react-loading-screen"
import { LazyLoadImage } from "react-lazy-load-image-component"
function MovieDetails() {
    const location = useLocation()
    const { currentUser } = useAuth()
    const [movie, setMovie] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [backgroundImg, setBackgroundImg] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    function handleWatchlist() {
        if (currentUser) {
            db.collection("Users").get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        const data = user.data()
                        if (currentUser.email === (data.email)) {
                            const watchlist = data.watchlist
                            if (watchlist.every(id => id !== movie.id)) {
                                watchlist.push(movie.id)
                            }
                            db.collection("Users").doc(user.id).update({
                                watchlist: watchlist
                            })
                        }
                    })
                })
        }
        else {
            history.push("/login")
        }
    }
    useEffect(() => {
        async function fetchdata() {
            await fetch(`https://api.themoviedb.org/3/movie/${location.pathname.split("-")[1]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
                .then(response => response.json())
                .then(response => {
                    if (response.poster_path)
                        setImgUrl("https://image.tmdb.org/t/p/w500/" + response.poster_path)
                    else
                        setImgUrl("placeholder.png")
                    if (response.backdrop_path)
                        setBackgroundImg("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + response.backdrop_path)
                    setMovie(response)
                    setLoading(false)
                })
        }

        fetchdata()


    }, [location])

    function handleRuntime(num) {
        if (num < 60)
            return (`${num}m`)
        const hour = Math.floor(num / 60)
        const minute = num % 60
        return (minute === 0 ? `${hour}h` : `${hour}h ${minute}m`)
    }

    const component = () => {
        if (movie) {
            const genresName = movie.genres.map(genre => { return genre.name })
            return (
                <div>
                    <Container fluid style={{ backgroundImage: `url(${backgroundImg})` }}
                        className="backgroundImg pl-0  detailsCard mb-4  ">
                        <Row className="movieInfoCard text-light ml-auto d-flex align-items-center" >
                            <Col md="auto" xs="12" className="my-4 " >
                                <LazyLoadImage
                                    effect="blur"
                                    placeholderSrc={process.env.PUBLIC_URL + "/placeholder.png"}
                                    src={imgUrl}
                                    alt={movie.original_title}
                                    className="detailsImg rounded" >
                                </LazyLoadImage>
                            </Col>
                            <Col >
                                <Row className="text-center" >
                                    <h1>{`${movie.original_title} (${movie.release_date.split("-")[0]})`}
                                    </h1>
                                    <h1 className="text-white-50"></h1>

                                </Row>
                                <Row className="ml-1">
                                    <h5 >{movie.vote_average} </h5>
                                    <h5 className="mx-1" >|{genresName.join(",")} |</h5>
                                    <h5 >{handleRuntime(movie.runtime)}</h5>

                                </Row>

                                <StarRating id={movie.id} ></StarRating>
                                <h5 className="text-white-50 ml-1" >{movie.tagline}</h5>
                                <h5>Overview</h5>
                                <p >{movie.overview} </p>
                                <Row className="ml-1 mb-2" >

                                    <Button onClick={handleWatchlist} >Add to watchlist</Button>

                                </Row>
                            </Col>


                        </Row>


                    </Container>
                    <Cast id={movie.id} ></Cast>
                </div>
            )
        }
    }
    return (
        <LoadingScreen loading={loading}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            text='Loading'
        >

            <div>{component()}</div>
        </LoadingScreen>

    )
}

export default MovieDetails
