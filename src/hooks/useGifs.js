import { useState, useEffect, useContext } from 'react'
import getGifs from '../services/getGifsService'
import GifsContext from '../context/GifsContext'

export default function useGifs({ keyword } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    const { gifs, setGifs } = useContext(GifsContext)

    useEffect(() => {
        setLoading(true)
        const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'
        getGifs({ keyword: keywordToUse })
            .then(newGifs => {
                setLoading(false)
                setGifs(newGifs)
                localStorage.setItem('lastKeyword', keywordToUse)
            })
    }, [keyword, setGifs])

    return { loading, gifs }
}