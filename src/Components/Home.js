import React, { useState, useEffect } from 'react'
import Trending from './Trending'
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import NowPlaying from './NowPlaying'
import { Link, useHistory } from 'react-router-dom'

function Home() {
    const [mainImg, setMainImg] = useState("")
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const history = useHistory()
    function getRandomMovieImage(path) {
        setMainImg(`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${path}`)
    }
    function handleSubmit(e) {
        e.preventDefault()
        history.push(`/search-${search}`)
    }
    function handleChange(e) {
        setSearch(e.target.value)
    }
    return (

        < div >
            <Container className="  pl-0 mb-0 mainImg" style={{ backgroundImage: `url(${mainImg})` }} >
                <Row className=" d-flex align-items-center  h-100 mainText text-light ml-auto  ">

                    <Col xs={12} className="mt-4" >
                        <h2 className="mb-0 homeText" > Welcome.Millions of movies to discover. Explore now.</h2>
                    </Col>

                    <Col >
                        <Form onSubmit={handleSubmit} className="d-flex homeForm" >
                            <Form.Control value={search} onChange={handleChange}
                                placeholder="Search a Movie" ></Form.Control>
                            <Button type="submit"  >Search</Button>
                        </Form>
                    </Col>


                </Row>
            </Container>
            <NowPlaying></NowPlaying>
            <Trending getRandomMovieImage={getRandomMovieImage} ></Trending>
        </div >
    )
}

export default Home
