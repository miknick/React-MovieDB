import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faBan } from "@fortawesome/free-solid-svg-icons"
import { db } from "../firebase"
import { useAuth } from "../Contexts/AuthContext"
import { useHistory } from "react-router-dom"
function StarRating(props) {
    const [value, setValue] = useState(0)
    const { currentUser } = useAuth()
    const history = useHistory()
    function handleRating(rating) {
        db.collection("Users").get()
            .then(snapshot => {
                snapshot.forEach(user => {
                    const data = user.data()
                    if (currentUser.email === (data.email)) {
                        const ratings = data.ratings
                        let index = null
                        for (let i = 0; i < ratings.length; i++)
                            if (Object.keys(ratings[i])[0] == props.id)
                                index = i
                        if (index || index === 0) {
                            ratings[index] = {
                                [props.id]: rating
                            }
                        }
                        else (
                            ratings.push({
                                [props.id]: rating
                            })
                        )
                        db.collection("Users").doc(user.id).update({
                            ratings: ratings
                        })
                    }
                })
            })
    }
    useEffect(() => {
        if (currentUser) {
            db.collection("Users").get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        const data = user.data()
                        if (currentUser.email === (data.email)) {
                            db.collection("Users").doc(user.id).get()
                                .then(snaphot => {
                                    let defaultStar = null
                                    snaphot.data().ratings.forEach(rating => {
                                        if (Object.keys(rating)[0] == props.id) {
                                            defaultStar = rating[props.id]
                                            setValue(rating[props.id])
                                        }
                                    })
                                    if (defaultStar) {
                                        const checkedStar = document.getElementById(`rating-${defaultStar}`)
                                        checkedStar.setAttribute("checked", "checked")

                                    }
                                    else {
                                        const ratingNone = document.getElementById("rating-none")
                                        ratingNone.setAttribute("checked", "checked")
                                    }
                                })
                        }
                    })
                })
        }
        else {

        }
    }, [])
    function handleClick(e) {
        if (currentUser) {
            setValue(e.target.value)
            handleRating(e.target.value)
        }
        else {
            history.push("/login")
        }

    }
    return (

        <div className="rating-group">
            <input onClick={handleClick} className=" rating__input rating__input--none" name="rating" id="rating-none"
                value="0" type="radio" />
            <label aria-label="No rating" className="rating__label" htmlFor="rating-none">
                <FontAwesomeIcon icon={faBan} className="rating__icon rating__icon--none "></FontAwesomeIcon >
            </label>
            <label aria-label="1 star" className="rating__label" htmlFor="rating-1">
                <FontAwesomeIcon icon={faStar} className="rating__icon rating__icon--star "></FontAwesomeIcon >
            </label>
            <input onClick={handleClick} className="rating__input" name="rating" id="rating-1" value="1" type="radio" />

            <label aria-label="2 stars" className="rating__label" htmlFor="rating-2">
                <FontAwesomeIcon icon={faStar} className="rating__icon rating__icon--star "></FontAwesomeIcon >
            </label>
            <input onClick={handleClick} className="rating__input" name="rating" id="rating-2" value="2"
                type="radio" />
            <label aria-label="3 stars" className="rating__label" htmlFor="rating-3">
                <FontAwesomeIcon icon={faStar} className="rating__icon rating__icon--star "></FontAwesomeIcon>
            </label>
            <input onClick={handleClick} className="rating__input" name="rating" id="rating-3" value="3"
                type="radio" />
            <label aria-label="4 stars" className="rating__label" htmlFor="rating-4">
                <FontAwesomeIcon icon={faStar} className="rating__icon rating__icon--star "></FontAwesomeIcon>
            </label>
            <input onClick={handleClick} className="rating__input" name="rating" id="rating-4" value="4" type="radio" />
            <label aria-label="5 stars" className="rating__label" htmlFor="rating-5">
                <FontAwesomeIcon icon={faStar} className="rating__icon rating__icon--star "></FontAwesomeIcon >
            </label>
            <input onClick={handleClick} className="rating__input" name="rating" id="rating-5" value="5" type="radio" />
            <h5 className="ml-1" >{value}/5</h5>
        </div>
    )
}

export default StarRating
