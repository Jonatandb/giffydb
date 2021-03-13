import React, { useRef, useCallback } from 'react'
import { useLocation } from 'wouter'
import useForm, { LANGUAGES, RATINGS } from './useForm'

const SearchForm = React.memo(({ initialKeyword = '', initialRating, initialLanguage }) => {
  const searchInputRef = useRef()
  const [, pushLocation] = useLocation()
  const {
    keyword,
    rating,
    language,
    updateKeyword,
    updateRating,
    updateLanguage,
    clearSearch,
  } = useForm({ initialKeyword, initialRating, initialLanguage })

  const handleSearchChange = e => updateKeyword(e.target.value)

  const handleRatingChange = e => updateRating(e.target.value)

  const handleLanguageChange = e => updateLanguage(e.target.value)

  const handleClearSearch = () => clearSearch()

  const handleSumbit = useCallback(
    evt => {
      evt.preventDefault()
      if (keyword && keyword.trim()) {
        pushLocation(`/search/${keyword.trim()}/${rating}/${language}`)
      } else {
        searchInputRef.current.select()
        searchInputRef.current.focus()
      }
    },
    [keyword, rating, language, pushLocation]
  )

  return (
    <form onSubmit={handleSumbit}>
      <div>
        <button onClick={handleSumbit}>Search</button>
        <input
          onChange={handleSearchChange}
          placeholder='Search a gif here...'
          ref={searchInputRef}
          type='text'
          value={keyword}
        />
      </div>
      <div>
        <select value={rating} onChange={handleRatingChange}>
          <option disabled>Rating type</option>
          {RATINGS.map(rating => (
            <option key={rating}>{rating}</option>
          ))}
        </select>
        <select value={language} onChange={handleLanguageChange}>
          <option disabled>Language</option>
          {LANGUAGES.map(language => (
            <option key={language}>{language}</option>
          ))}
        </select>
        <button onClick={handleClearSearch}>Clear</button>
      </div>
    </form>
  )
})

export default SearchForm
