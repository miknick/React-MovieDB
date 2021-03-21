import React, { useState } from 'react'
import Trending from './Trending'
import { Col, Container, Row } from "react-bootstrap"
import NowPlaying from './NowPlaying'
import SearchBar from './SearchBar'
import LoadingScreen from "react-loading-screen"
import 'react-lazy-load-image-component/src/effects/blur.css';
function Home() {
    const [mainImg, setMainImg] = useState("")
    const [loading, setLoading] = useState(true)
    function getRandomMovieImage(path) {
        setMainImg(`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${path}`)
        setTimeout(() => setLoading(false), 500)
    }
    const component = () => {
        return (
            <div>
                <Container className="  pl-0 mb-0    mainImg"
                    style={{ backgroundImage: `url(${mainImg})` }} >
                    <Row className=" d-flex align-items-center  h-100 mainText text-light ml-auto  ">

                        <Col xs={12} className="mt-4" >
                            <h2 className="mb-0 homeText" > Welcome.Millions of movies to discover. Explore now.</h2>
                        </Col>

                        <Col >
                            <SearchBar styleClass="homeForm"></SearchBar>
                        </Col>


                    </Row>
                </Container>
                <NowPlaying></NowPlaying>
                <Trending getRandomMovieImage={getRandomMovieImage} ></Trending>
            </div>
        )
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

export default Home
