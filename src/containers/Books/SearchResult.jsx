import React, {useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import BookCard from "../../components/BookCard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {searchBooksList} from "../../stores/Books/actions";
import Loader from "../../components/Loader";
import BookFilters from "../../components/BookFilters";
import BookPagination from "../../components/BookPagination";

function SearchResult() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [authorsChecked, setAuthorsChecked] = useState([]);
    const [genreChecked, setGenreChecked] = useState([]);
    const [publisherChecked, setPublisherChecked] = useState([]);

    useEffect(() => {
        if (searchParams.get("authors")) {
            setAuthorsChecked(searchParams.get("authors").split(','));
        }
    }, [searchParams.get("authors")]);

    useEffect(() => {
        if (searchParams.get("genre")) {
            setGenreChecked(searchParams.get("genre").split(','));
        }
    }, [searchParams.get("genre")]);

    useEffect(() => {
        if (searchParams.get("publisher")) {
            setPublisherChecked(searchParams.get("publisher").split(','));
        }
    }, [searchParams.get("publisher")]);

    const [page, setPage] = useState(1)

    const perPage = 12;

    const dispatch = useDispatch();




    const [searchUrl, setSearchUrl] = useState()


    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            let queryParams = `/search?q=${query}&page=${page}`;
            if (authorsChecked.length > 0) {
                queryParams += `&authors=${authorsChecked}`;
            }
            if (genreChecked.length > 0) {
                queryParams += `&genre=${genreChecked}`;
            }
            if (publisherChecked.length > 0) {
                queryParams += `&publisher=${publisherChecked}`;
            }
            setSearchUrl(queryParams);
            navigate(queryParams);

        }

    }, [page, query, authorsChecked, genreChecked, publisherChecked]);

    useEffect(() => {
        if (query && searchUrl) {
            dispatch(searchBooksList({searchUrl, perPage}))
        }

    }, [dispatch, searchUrl]);

    const {isSearchBookListFetching, searchBookListError, searchBookList} = useSelector(state => state?.BookReducer);


    return (
        <HelmetProvider>
            <Helmet>
                <title>Search Book</title>
            </Helmet>
            <main className="my-5 bg-grey">
                <Container fluid>
                    <Row>
                        <Col sm={3}>
                            <Card>
                                <Card.Header>
                                    <h4>Filter</h4>
                                </Card.Header>
                                <Card.Body>
                                    <BookFilters
                                        authorsChecked={authorsChecked}
                                        setAuthorsChecked={setAuthorsChecked}
                                        genreChecked={genreChecked}
                                        setGenreChecked={setGenreChecked}
                                        publisherChecked={publisherChecked}
                                        setPublisherChecked={setPublisherChecked}
                                        setPage={setPage}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={9}>
                            {isSearchBookListFetching ?
                                <Row className="m-auto pt-5">
                                    <Loader/>
                                </Row>
                                :
                                <Row>
                                    {searchBookList?.data?.length > 0 ?
                                        searchBookList?.data?.map((book) => (
                                            <Col sm={4} className="mb-4">
                                                <BookCard book={book}/>
                                            </Col>
                                        ))
                                        : (
                                            <Alert variant="danger">No data found.</Alert>
                                        )}
                                </Row>
                            }
                            {searchBookListError &&
                                <Alert variant="danger">
                                    {searchBookListError}
                                </Alert>}
                            {searchBookList?.data?.length > 0
                                && !isSearchBookListFetching &&
                                <BookPagination bookList={searchBookList} setPage={setPage}/>
                            }
                        </Col>
                    </Row>

                </Container>
            </main>
        </HelmetProvider>

    )
}

export default SearchResult;