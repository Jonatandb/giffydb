import { useState, useEffect } from 'react'
import getGifs from '../services/getGifs'

export default function useGifs(keyword) {
    const [loading, setLoading] = useState(false)
    const [gifs, setGifs] = useState([])

    useEffect(function () {
        setLoading(true)
        getGifs({ keyword })
            .then(gettedGifs => {
                setLoading(false)
                setGifs(gettedGifs)
            })
    }, [keyword])
    return { loading, gifs }
}