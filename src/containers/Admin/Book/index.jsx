import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Container, Pagination, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faPlus, faTrash} from "@fortawesome/fontawesome-free-solid";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {compose} from "redux";
import {getBooksList} from "../../../stores/Books/actions";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../components/Loader";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import DeleteModal from "./DeleteModal";
import BookPagination from "../../../components/BookPagination";

function Book() {
    const dispatch = useDispatch();


    const [page, setPage] = useState(1)
    const perPage = 10;

    useEffect(() => {
        dispatch(getBooksList({page, perPage}));
    }, [dispatch, page]);

    const {bookList, isBookListFetching, bookListError} = useSelector(state => state?.BookReducer);

    const [deleteId, setDeleteId] = useState('');
    return (
        <HelmetProvider>
            <Helmet>
                <title>Book List (Total: )</title>
            </Helmet>
            <main className="my-5">
                <Container>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={8}>
                                    <h4>All Books <small>(Total: {bookList?.total})</small></h4>
                                </Col>
                                <Col sm={4}>
                                    <Button as={Link} to="/admin/book/add"
                                            className="btn btn-primary float-end"><FontAwesomeIcon icon={faPlus}/> Add
                                        New
                                        Book</Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>

                            <Container className="mt-3">
                                <Row>
                                    <Table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Published</th>
                                            <th>Publisher</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {

                                            bookList?.data?.length > 0 && bookList?.data?.map((book, index) => (
                                                <tr key={book.id}>
                                                    <td>{book?.title}</td>
                                                    <td>{book?.author}</td>
                                                    <td>{moment(book?.published).format('DD-MM-YYYY')}</td>
                                                    <td>{book?.publisher}</td>
                                                    <td>
                                                        <Button as={Link} to={`/admin/book/edit/${book?.id}`}
                                                                variant="success"
                                                                size="sm"><FontAwesomeIcon
                                                            icon={faPencilAlt}/></Button>
                                                        &nbsp;&nbsp;
                                                        <Button variant="danger" onClick={() => setDeleteId(book?.id)}
                                                                size="sm"><FontAwesomeIcon icon={faTrash}/></Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                    {isBookListFetching && <Loader/>}
                                    {bookListError &&
                                        <Alert variant="danger">
                                            {bookListError}
                                        </Alert>
                                    }
                                    {bookList?.data?.length > 0 &&
                                        <BookPagination bookList={bookList} setPage={setPage}/>
                                    }
                                </Row>
                            </Container>
                            {deleteId &&
                                <DeleteModal
                                    deleteId={deleteId}
                                    setDeleteId={setDeleteId}
                                    currentPage={bookList?.current_page}
                                    total={bookList?.total}
                                    perPage={perPage}
                                />
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </main>
        </HelmetProvider>
    )
}

export default compose(Book);
