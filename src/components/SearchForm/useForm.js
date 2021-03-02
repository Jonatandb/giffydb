import { useCallback, useReducer } from "react"

export const RATINGS = ['g', 'pg', 'pg-13', 'r']

export const LANGUAGES = ['en', 'es', 'fi', 'ja', 'ru']

const ACTIONS = {
    UPDATE_KEYWORD: 'UPDATE_KEYWORD',
    UPDATE_RATING: 'UPDATE_RATING',
    UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
    CLEAR_SEARCH: 'CLEAR_SEARCH'
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
    }),
    [ACTIONS.CLEAR_SEARCH]: (state, action) => ({
        keyword: '',
        rating: RATINGS[0],
        language: LANGUAGES[0]
    })
}

const REDUCER = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type]
    return actionReducer ? actionReducer(state, action) : state
}

export default function useForm({ initialKeyword, initialRating, initialLanguage }) {

    const initialState = {
        keyword: decodeURIComponent(initialKeyword),
        rating: initialRating || RATINGS[0],
        language: initialLanguage || LANGUAGES[0]
    }

    const [state, dispatch] = useReducer(REDUCER, initialState)

    const { keyword, rating, language } = state

    return {
        keyword,
        rating,
        language,
        updateKeyword: useCallback(keyword => dispatch({
            type: ACTIONS.UPDATE_KEYWORD,
            payload: keyword
        }), []),
        updateRating: useCallback(rating => dispatch({
            type: ACTIONS.UPDATE_RATING,
            payload: rating
        }), []),
        updateLanguage: useCallback(language => dispatch({
            type: ACTIONS.UPDATE_LANGUAGE,
            payload: language
        }), []),
        clearSearch: useCallback(() => dispatch({
            type: ACTIONS.CLEAR_SEARCH
        }), [])
    }
}
