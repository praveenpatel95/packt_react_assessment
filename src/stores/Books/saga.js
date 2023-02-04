import {call, put, takeLatest, all} from 'redux-saga/effects'
import api from "../../utils/api";
import {
    addBookFailure,
    addBookSuccess,
    deleteBookFailure,
    deleteBookSuccess,
    getBookFailure, getBookFiltersListFailure, getBookFiltersListSuccess,
    getBooksListFailure,
    getBooksListSuccess,
    getBookSuccess,
    searchBooksListFailure,
    searchBooksListSuccess,
    updateBookFailure,
    updateBookSuccess
} from "./actions";

import {
    ADD_BOOK,
    DELETE_BOOK,
    GET_BOOK,
    GET_BOOK_FILTERS_LIST,
    GET_BOOKS_LIST,
    SEARCH_BOOKS_LIST,
    UPDATE_BOOK
} from "./constant";

export function* fetchBookList({payload}) {

    try {
        //let query = payload ? payload:''
        const response = yield call(api().get, `/admin/books?page=${payload.page}&perPage=${payload.perPage}`);
        if (response) {
            yield put(getBooksListSuccess(response?.data));
        }
    } catch (e) {
        yield put(getBooksListFailure(e.message));
    }
}

//AddEdit book saga
export function* addBookSaga({payload}) {
    try {
        const response = yield call(api().post, `/admin/books`, payload);
        if (response) {
            yield put(addBookSuccess(response?.data));
        }
    } catch (e) {
        yield put(addBookFailure(e.error));
    }
}

export function* getBookSaga({payload}) {
    try {
        const response = yield call(api().get, `/admin/books/${payload}`);
        if (response) {
            yield put(getBookSuccess(response?.data));
        }
    } catch (e) {
        yield put(getBookFailure(e.error));
    }
}

export function* updateBookSaga({payload}) {
    try {
        const response = yield call(api().post, `/admin/books/${payload.bookId}?_method=put`, payload.formData);
        if (response) {
            yield put(updateBookSuccess(response?.data));
        }
    } catch (e) {
        yield put(updateBookFailure(e.error));
    }
}

export function* deleteBookSaga({payload}) {
    try {
        const response = yield call(api().delete, `/admin/books/${payload}`);
        if (response) {
            yield put(deleteBookSuccess(response?.data));
        }
    } catch (e) {
        yield put(deleteBookFailure(e.error));
    }
}

//for search books
export function* searchBookListSaga({payload}) {
    try {
        const response = yield call(api().get, `${payload.searchUrl}&perPage=${payload.perPage}`);
        if (response) {
            yield put(searchBooksListSuccess(response?.data));
        }
    } catch (e) {
        yield put(searchBooksListFailure(e.error));
    }
}

//for filters paramters books
export function* filtersParameterBookListSaga() {
    try {
        const response = yield call(api().get, `/filters`);
        if (response) {
            yield put(getBookFiltersListSuccess(response?.data));
        }
    } catch (e) {
        yield put(getBookFiltersListFailure(e.error));
    }
}

/**
 *
 * Saga flow
 */

export function* fetchBookListFlow() {
    yield takeLatest(GET_BOOKS_LIST, fetchBookList);
}

export function* addBookFlow() {
    yield takeLatest(ADD_BOOK, addBookSaga);
}

export function* getBookFlow() {
    yield takeLatest(GET_BOOK, getBookSaga);
}

export function* updateBookSagaFlow() {
    yield takeLatest(UPDATE_BOOK, updateBookSaga);
}

export function* deleteBookSagaFlow() {
    yield takeLatest(DELETE_BOOK, deleteBookSaga);
}
export function* searchBookListSagaFlow() {
    yield takeLatest(SEARCH_BOOKS_LIST, searchBookListSaga);
}

export function* filtersParameterBookListSagaFlow() {
    yield takeLatest(GET_BOOK_FILTERS_LIST, filtersParameterBookListSaga);
}
/**
 *
 * Cobime
 */
export default function* bookSaga() {
    yield all([
        fetchBookListFlow(),
        addBookFlow(),
        getBookFlow(),
        updateBookSagaFlow(),
        deleteBookSagaFlow(),
        searchBookListSagaFlow(),
        filtersParameterBookListSagaFlow(),
    ]);
}
