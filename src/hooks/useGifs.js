import { useState, useEffect, useContext } from 'react'
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

export default function useGifs({ keyword } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    const { gifs, setGifs } = useContext(GifsContext)

    useEffect(function () {
        setLoading(true)

        // recupero la keyword de localStorage
        const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

        getGifs({ keyword: keywordToUse })
            .then(gettedGifs => {
                setLoading(false)
                setGifs(gettedGifs)
                // guardado de keyword en localStorage
                localStorage.setItem('lastKeyword', keywordToUse)
            })
    }, [keyword, setGifs])
    return { loading, gifs }
}