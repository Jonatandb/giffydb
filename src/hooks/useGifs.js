import { useState, useEffect, useContext } from 'react'
import getGifsService from 'services/getGifsService'
import GifsContext from 'context/GifsContext'

export default function useGifs({ keyword } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [page, setPage] = useState(0)
    const { gifs, setGifs } = useContext(GifsContext)
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

    useEffect(() => {
        setLoading(true)
        getGifsService({ keyword: keywordToUse })
            .then(newGifs => {
                setLoading(false)
                setGifs(newGifs)
                localStorage.setItem('lastKeyword', keywordToUse)
            })
            .catch(err => {
                console.log('Error getting gifs:', err)
                setLoading(false)
            })
    }, [keywordToUse, setGifs])

    useEffect(() => {
        if (page === 0) return
        setLoadingNextPage(true)
        getGifsService({ keyword: keywordToUse, page })
            .then(nextPageGifs => {
                setLoadingNextPage(false)
                setGifs(prevGifs => prevGifs.concat(nextPageGifs))
            })
            .catch(err => {
                console.log('Error getting next page of gifs:', err)
                setLoadingNextPage(false)
            })
    }, [keywordToUse, page, setGifs])

    return { loading, loadingNextPage, gifs, setPage }
}