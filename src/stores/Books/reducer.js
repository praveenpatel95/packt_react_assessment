import * as types from "./constant";

export const initialState = {

    isBookListFetching: false,
    bookList: [],
    bookListError: null,

    // AddEdit/Edit
    isSubmitting: false,
    isSubmitError: null,
    submitSuccess: false,

    //get
    book: {},
    isBookFetching: false,

    //delete
    isBookDeleting: false,
    isDeleted: false,
    deletingError: null,

    // Search book
    isSearchBookListFetching: false,
    searchBookListError: null,
    searchBookList: [],

    // filters book
    isFetchingFilters: false,
    bookFilters: [],
};

const BookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BOOKS_LIST:
            return {
                ...state,
                isBookListFetching: true,
                bookListError: null,
                submitSuccess: false,
                isDeleted: false,
                book: {}
            };
        case types.GET_BOOKS_LIST_SUCCESS:
            return {
                ...state,
                isBookListFetching: false,
                bookList: action.payload,
                bookListError: null,
            };
        case types.GET_BOOKS_LIST_FAILURE:
            return {
                ...state,
                isBookListFetching: false,
                bookListError: action.payload,
            };

        case types.ADD_BOOK:
            return {
                ...state,
                isSubmitting: true,
            };
        case types.ADD_BOOK_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: null,
                submitSuccess: true
            };
        case types.ADD_BOOK_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: action.payload,
            };

        case types.GET_BOOK:
            return {
                ...state,
                isSubmitError: null,
                isBookFetching: true,
            };
        case types.GET_BOOK_SUCCESS:
            return {
                ...state,
                book: action.payload,
                isBookFetching: false,
            };
        case types.GET_BOOK_FAILURE:
            return {
                ...state,
                isSubmitError: action.payload,
                isBookFetching: false,
            };

        case types.UPDATE_BOOK:
            return {
                ...state,
                isSubmitting: true,
            };
        case types.UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: null,
                submitSuccess: true
            };
        case types.UPDATE_BOOK_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: action.payload,
            };

        case types.DELETE_BOOK:
            return {
                ...state,
                isBookDeleting: true,
            };
        case types.DELETE_BOOK_SUCCESS:
            return {
                ...state,
                isBookDeleting: false,
                isDeleted: true
            };
        case types.DELETE_BOOK_FAILURE:
            return {
                ...state,
                isBookDeleting: false,
                deletingError: action.payload,
            };

        //Search book case
        case types.SEARCH_BOOKS_LIST:
            return {
                ...state,
                isSearchBookListFetching: true,
                searchBookListError: null,
            };
        case types.SEARCH_BOOKS_LIST_SUCCESS:
            return {
                ...state,
                isSearchBookListFetching: false,
                searchBookListError: null,
                searchBookList: action.payload,
            };
        case types.SEARCH_BOOKS_LIST_FAILURE:
            return {
                ...state,
                isSearchBookListFetching: false,
                searchBookListError: action.payload,
            };

        //Filter book case
        case types.GET_BOOK_FILTERS_LIST:
            return {
                ...state,
                isBookFetching: true,
            };
        case types.GET_BOOK_FILTERS_LIST_SUCCESS:
            return {
                ...state,
                isBookFetching: false,
                bookFilters: action.payload,
            };
        case types.GET_BOOK_FILTERS_LIST_FAILURE:
            return {
                ...state,
                isBookFetching: false,
            };
        default:
            return state;
    }
}

export default BookReducer;