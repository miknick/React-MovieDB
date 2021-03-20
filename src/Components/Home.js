import React, { useState } from 'react'
import Trending from './Trending'
import { Col, Container, Row } from "react-bootstrap"
import NowPlaying from './NowPlaying'
import SearchBar from './SearchBar'
import LoadingScreen from "react-loading-screen"
function Home() {
    const [mainImg, setMainImg] = useState("")
    function getRandomMovieImage(path) {
        setMainImg(`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${path}`)
    }
    const component = () => {
        return (
            <div>
                <Container className="  pl-0 mb-0 mainImg" style={{ backgroundImage: `url(${mainImg})` }} >
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
        <>
            {component()}

        </>
    )
}

export default Home
