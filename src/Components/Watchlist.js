import React, { useEffect, useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { db } from "../firebase"
import WatchlistCard from "./WatchlistCard"
function Watchlist() {
    const { currentUser } = useAuth()
    const [watchlist, setWatchlist] = useState()
    function handleRemove(id) {
        const updatedWatchlist = watchlist.filter(movieId => movieId !== id)
        db.collection("Users").get()
            .then(snapshot => {
                snapshot.forEach(user => {
                    const data = user.data()
                    if (currentUser.email === (data.email)) {
                        db.collection("Users").doc(user.id).update({
                            watchlist: updatedWatchlist
                        })
                    }
                })
            })
        setWatchlist(updatedWatchlist)

    }
    useEffect(() => {
        db.collection("Users").get()
            .then(snapshot => {
                snapshot.forEach(user => {
                    const data = user.data()
                    if (currentUser.email === (data.email)) {
                        setWatchlist(data.watchlist)
                    }
                })
            })
    }, [])
    const component = watchlist && watchlist.map(id => {
        return (<WatchlistCard handleRemove={handleRemove}
            key={id} id={id} ></WatchlistCard>)
    })
    return (
        <div>
            {component}
        </div>
    )
}

export default Watchlist
