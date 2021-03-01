import React, { useRef, useState, useCallback } from 'react'
import { useLocation } from 'wouter'

const SearchForm = React.memo(() => {
    const [keyword, setKeyword] = useState('')
    const searchInputRef = useRef()
    const [, pushLocation] = useLocation()

    const handleChange = useCallback(evt => {
        setKeyword(evt.target.value)
    }, [])

    const handleSumbit = useCallback(evt => {
        evt.preventDefault()
        if (keyword && keyword.trim()) {
            pushLocation(`/search/${keyword.trim()}`)
        } else {
            searchInputRef.current.select()
            searchInputRef.current.focus()
        }
    }, [keyword, pushLocation])

    return (
        <form onSubmit={handleSumbit}>
            <button>Search</button>
            <input
                onChange={handleChange}
                placeholder="Search a gif here..."
                ref={searchInputRef}
                type="text"
                value={keyword} />
        </form>
    )
})

export default SearchForm
