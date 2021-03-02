import { useState, useEffect, useContext } from 'react'
import getGifsService from 'services/getGifsService'
import GifsContext from 'context/GifsContext'

export default function useGifs({ keyword, rating, language } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [page, setPage] = useState(0)
    const { gifs, setGifs } = useContext(GifsContext)
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'scarlett johansson'

    useEffect(() => {
        setLoading(true)
        getGifsService({ keyword: keywordToUse, rating, language })
            .then(newGifs => {
                setLoading(false)
                setGifs(newGifs)
                localStorage.setItem('lastKeyword', keywordToUse)
            })
            .catch(err => {
                console.log('Error getting gifs:', err)
                setLoading(false)
            })
    }, [keywordToUse, setGifs, rating, language])

    useEffect(() => {
        if (page === 0) return
        setLoadingNextPage(true)
        getGifsService({ keyword: keywordToUse, page, rating, language })
            .then(nextPageGifs => {
                setLoadingNextPage(false)
                setGifs(prevGifs => prevGifs.concat(nextPageGifs))
            })
            .catch(err => {
                console.log('Error getting next page of gifs:', err)
                setLoadingNextPage(false)
            })
    }, [keywordToUse, page, setGifs, rating, language])

    return { loading, loadingNextPage, gifs, setPage }
}