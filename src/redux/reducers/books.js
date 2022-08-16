import {GET_ALL_BOOKS, GET_BOOK_BY_ID, GET_BOOKS_BY_NAME, GET_BOOK_BY_GENRE, GET_YEARS, GET_BOOKS_BY_YEARS, GET_BOOKS_RATING, USER_ROLE} from '../actions/variables'

let initialState = {
    allBooks: [],
    allBooksByName: [],
    allBooksByGenre: [],
    allBooksByRealiced: {},
    allBoksByRating: [],
    bookById: {},
    year: [],
    name: '',
    role: 'loading'
}

export default function root(state = initialState, actions){
    switch (actions.type) {
        case GET_ALL_BOOKS:
            return {
                ...state,
                allBooks: actions.payload
            }
        case GET_BOOK_BY_ID:
            return {
                ...state,
                bookById: actions.payload
            }
        case GET_BOOKS_BY_NAME:
            return {
                ...state,
                allBooksByName: actions.payload.Books,
                name: actions.payload.name
            }
        case GET_BOOK_BY_GENRE:
            return {
                ...state,
                allBooksByGenre: actions.payload
            }
        case GET_YEARS:
            let yearsToFilter = [];
            let releasedArray = actions.payload.map(l => Number(l.released.split('-')[0]));
            let sortedReleasedArray = releasedArray.sort(function(a, b) {
                return a - b;
            })
            const topYear = sortedReleasedArray[sortedReleasedArray.length - 1];
            const bottomYear = sortedReleasedArray[0] - (sortedReleasedArray[0] % 5);
            for (let i = 1; i < Math.ceil((topYear - bottomYear)/5); i++) {
                let bot = bottomYear - 5 + (i * 5);
                let top = bottomYear + (i * 5);
                let prove = sortedReleasedArray.filter(n => n>=bot && n<top);
                if (prove.length > 0){
                    yearsToFilter.push(`${bot}-${top}`);
                }
            }
            yearsToFilter.push(`${bottomYear - 5 + (5*(Math.ceil((topYear - bottomYear)/5)))}-${topYear}`);
            return {
                ...state,
                year: yearsToFilter
            }
        case GET_BOOKS_BY_YEARS:
            return {
                ...state,
                allBooksByRealiced: actions.payload
            }
        case GET_BOOKS_RATING:
            let rating = actions.payload.filter(e => e.rating === 5)
        return {
            ...state,
            allBoksByRating: rating
        }
        case USER_ROLE:
            return {
                ...state,
                role: actions.payload
            }
        case CLEAN_UP_DETAIL:
            return {
                ...state,
                bookById: {}
            }
        default:
            return {...state}
    }
}