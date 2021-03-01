import React, { useRef, useState, useCallback } from 'react'
import { useLocation } from 'wouter'

const RATINGS = ['g', 'pg', 'pg-13', 'r']

const SearchForm = React.memo(({ initialKeyword = '', initialRating }) => {
    const [keyword, setKeyword] = useState(decodeURIComponent(initialKeyword))
    const [rating, setRating] = useState(initialRating || RATINGS[0])
    const searchInputRef = useRef()
    const [, pushLocation] = useLocation()

    const handleSearchChange = useCallback(evt => {
        setKeyword(evt.target.value)
    }, [])

    const handleRatingChange = useCallback(evt => {
        setRating(evt.target.value)
    }, [])

    const handleSumbit = useCallback(evt => {
        evt.preventDefault()
        if (keyword && keyword.trim()) {
            pushLocation(`/search/${keyword.trim()}/${rating}`)
        } else {
            searchInputRef.current.select()
            searchInputRef.current.focus()
        }
    }, [keyword, pushLocation, rating])

    return (
        <form onSubmit={handleSumbit}>
            <button>Search</button>
            <input
                onChange={handleSearchChange}
                placeholder="Search a gif here..."
                ref={searchInputRef}
                type="text"
                value={keyword} />
            <select value={rating} onChange={handleRatingChange}>
                <option disabled>Rating type</option>
                {
                    RATINGS.map(rating => <option key={rating}>{rating}</option>)
                }
            </select>
        </form>
    )
})

export default SearchForm
