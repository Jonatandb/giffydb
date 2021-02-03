import React, { useRef, useState } from 'react'

const SearchForm = React.memo(({ onSubmit }) => {
    const [keyword, setKeyword] = useState('')
    const searchInputRef = useRef()

    const handleChange = evt => {
        setKeyword(evt.target.value)
    }

    const handleSumbit = evt => {
        evt.preventDefault()
        if (keyword && keyword.trim()) {
            onSubmit({ keyword })
        } else {
            searchInputRef.current.select()
            searchInputRef.current.focus()
        }
    }

    return (
        <form onSubmit={handleSumbit}>
            <button>Buscar</button>
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
