import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { db } from "../firebase"
import WatchlistCard from "./WatchlistCard"
import LoadingScreen from "react-loading-screen"
function Watchlist() {
    const { currentUser } = useAuth()
    const [watchlist, setWatchlist] = useState()
    const [loading, setLoading] = useState(true)
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
                        setLoading(false)
                    }
                })
            })
    }, [])
    const component = watchlist && watchlist.map(id => {
        return (<WatchlistCard handleRemove={handleRemove}
            key={id} id={id} ></WatchlistCard>)
    })
    return (
        <LoadingScreen loading={loading}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            text='Loading'
        >

            <div>{component}</div>
        </LoadingScreen>
    )
}

export default Watchlist
