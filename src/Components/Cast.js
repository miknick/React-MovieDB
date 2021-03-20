import React, { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'

function Cast(props) {
    const [credits, setCredits] = useState()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(response => setCredits(response))
    }, [props])
    const castComponent = credits && credits.cast.map((person) => {
        const imgUrl = person.profile_path
            ? `https://www.themoviedb.org/t/p/w500/${person.profile_path}`
            : "placeholder.png"
        return (
            <Container key={Math.random()}>
                <div className="castCard  " >
                    <img className="castImg h-70" src={imgUrl}></img>
                    <p className="mx-1 my-0" ><strong> {person.name}</strong></p>
                    <p className="mx-1 my-0">{person.character}</p>


                </div>
            </Container>
        )
    })
    return (
        <Container className="d-flex overflow-auto ">
            {castComponent}

        </Container>
    )
}
export default Cast
