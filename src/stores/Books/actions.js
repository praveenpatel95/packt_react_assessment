import * as types from './constant'

//Get actions
export const getBooksList = (payload) => ({
    type: types.GET_BOOKS_LIST,
    payload,
});

export const getBooksListSuccess = (payload) => ({
    type: types.GET_BOOKS_LIST_SUCCESS,
    payload,
});

export const getBooksListFailure = (payload) => ({
    type: types.GET_BOOKS_LIST_FAILURE,
    payload,
});

//Create actions
export const addBook = (payload) => ({
    type: types.ADD_BOOK,
    payload,
});

export const addBookSuccess = (payload) => ({
    type: types.ADD_BOOK_SUCCESS,
    payload,
});

export const addBookFailure = (payload) => ({
    type: types.ADD_BOOK_FAILURE,
    payload,
});

//get book actions
export const getBook = (payload) => ({
    type: types.GET_BOOK,
    payload,
});

export const getBookSuccess = (payload) => ({
    type: types.GET_BOOK_SUCCESS,
    payload,
});

export const getBookFailure = (payload) => ({
    type: types.GET_BOOK_FAILURE,
    payload,
});

//update book actions
export const updateBook = (payload) => ({
    type: types.UPDATE_BOOK,
    payload,
});

export const updateBookSuccess = (payload) => ({
    type: types.UPDATE_BOOK_SUCCESS,
    payload,
});

export const updateBookFailure = (payload) => ({
    type: types.UPDATE_BOOK_FAILURE,
    payload,
});

//delete book actions
export const deleteBook = (payload) => ({
    type: types.DELETE_BOOK,
    payload,
});

export const deleteBookSuccess = (payload) => ({
    type: types.DELETE_BOOK_SUCCESS,
    payload,
});

export const deleteBookFailure = (payload) => ({
    type: types.DELETE_BOOK_FAILURE,
    payload,
});

//Search book list actions
export const searchBooksList = (payload) => ({
    type: types.SEARCH_BOOKS_LIST,
    payload,
});

export const searchBooksListSuccess = (payload) => ({
    type: types.SEARCH_BOOKS_LIST_SUCCESS,
    payload,
});

export const searchBooksListFailure = (payload) => ({
    type: types.SEARCH_BOOKS_LIST_FAILURE,
    payload,
});

//book filters actions
export const getBookFiltersList = (payload) => ({
    type: types.GET_BOOK_FILTERS_LIST,
    payload,
});

export const getBookFiltersListSuccess = (payload) => ({
    type: types.GET_BOOK_FILTERS_LIST_SUCCESS,
    payload,
});

export const getBookFiltersListFailure = (payload) => ({
    type: types.GET_BOOK_FILTERS_LIST_FAILURE,
    payload,
});