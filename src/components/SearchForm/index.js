import React, { useRef, useCallback, useReducer } from 'react'
import { useLocation } from 'wouter'

const RATINGS = ['g', 'pg', 'pg-13', 'r']

const LANGUAGES = ['en', 'es', 'fi', 'ja', 'ru']

const ACTIONS = {
    UPDATE_KEYWORD: 'UPDATE_KEYWORD',
    UPDATE_RATING: 'UPDATE_RATING',
    UPDATE_LANGUAGE: 'UPDATE_LANGUAGE'
}

const ACTIONS_REDUCERS = {
    [ACTIONS.UPDATE_KEYWORD]: (state, action) => ({
        ...state,
        keyword: action.payload
    }),
    [ACTIONS.UPDATE_RATING]: (state, action) => ({
        ...state,
        rating: action.payload
    }),
    [ACTIONS.UPDATE_LANGUAGE]: (state, action) => ({
        ...state,
        language: action.payload
    })
}

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type]
    return actionReducer ? actionReducer(state, action) : state
}

const SearchForm = React.memo(({ initialKeyword = '', initialRating, initialLanguage }) => {
    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        rating: initialRating || RATINGS[0],
        language: initialLanguage || LANGUAGES[0]
    })
    const searchInputRef = useRef()
    const [, pushLocation] = useLocation()

    const { keyword, rating, language } = state

    const handleSearchChange = useCallback(evt => {
        dispatch({
            type: ACTIONS.UPDATE_KEYWORD,
            payload: evt.target.value
        })
    }, [])

    const handleRatingChange = useCallback(evt => {
        dispatch({
            type: ACTIONS.UPDATE_RATING,
            payload: evt.target.value
        })
    }, [])

    const handleLanguageChange = useCallback(evt => {
        dispatch({
            type: ACTIONS.UPDATE_LANGUAGE,
            payload: evt.target.value
        })
    }, [])

    const handleSumbit = useCallback(evt => {
        evt.preventDefault()
        if (keyword && keyword.trim()) {
            pushLocation(`/search/${keyword.trim()}/${rating}/${language}`)
        } else {
            searchInputRef.current.select()
            searchInputRef.current.focus()
        }
    }, [keyword, rating, language, pushLocation])

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
            <select value={language} onChange={handleLanguageChange}>
                <option disabled>Language</option>
                {
                    LANGUAGES.map(language => <option key={language}>{language}</option>)
                }
            </select>
        </form>
    )
})

export default SearchForm
