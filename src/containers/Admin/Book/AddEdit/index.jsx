import React, {useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/fontawesome-free-solid";
import {useDispatch, useSelector} from "react-redux";
import {addBook, getBook, updateBook} from "../../../../stores/Books/actions";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../../../components/Loader";

function BookAdd() {
    let {bookId} = useParams();
    const dispatch = useDispatch();
    //For get book data
    useEffect(() => {
        if (parseInt(bookId)) {
            dispatch(getBook(bookId))
        }
    }, [bookId, dispatch]);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState('');
    const [published, setPublished] = useState(new Date());
    const [publisher, setPublisher] = useState('');


    const handleBookSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("genre", genre);
        formData.append("description", description);
        formData.append("isbn", isbn);
        formData.append("published", moment(published, "DD-MM-YYYY").format('YYYY-MM-DD'));
        formData.append("publisher", publisher);

        if (image) {
            formData.append("image", image);
        }
        if (parseInt(bookId)) {
            dispatch(updateBook({formData, bookId}))
        } else {
            dispatch(addBook(formData))
        }


    }

    const navigate = useNavigate();
    const {isSubmitting, isSubmitError, submitSuccess, book, isBookFetching} = useSelector(state => state?.BookReducer);
    useEffect(() => {
        if (submitSuccess) {
            navigate(`/admin/books`);
        }
    }, [submitSuccess, navigate]);


    useEffect(() => {
        if (book && bookId) {
            setTitle(book?.title)
            setAuthor(book?.author)
            setGenre(book?.genre)
            setDescription(book?.description)
            setIsbn(book?.isbn)
            setPublished(moment(book.published, "YYYY-MM-DD").format("DD-MM-YYYY"))
            setPublisher(book?.publisher)
        }
    }, [book, bookId]);


    return (
        <HelmetProvider>
            <Helmet>
                <title>{bookId ? "Edit Book" : "Add New Book"}</title>
            </Helmet>
            <main className="my-5">
                <Container>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col sm={8}>
                                    <h4>{bookId ? "Edit Book" : "Add New Book"}</h4>
                                </Col>
                                <Col sm={4}>
                                    <Button as={Link} to="/admin/books" variant="dark"
                                            className="float-end"><FontAwesomeIcon
                                        icon={faArrowLeft}/>
                                        &nbsp;Back</Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Container className="mt-3">
                                {isBookFetching ?
                                    <Row className="m-auto"><Loader/></Row>
                                    :
                                    <Form validated={true} onSubmit={handleBookSubmit}>
                                        <Form.Group as={Col} md="12" className="mb-3">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter book title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                                maxLength={255}
                                            />

                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Author</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter author name"
                                                    value={author}
                                                    onChange={e => setAuthor(e.target.value)}
                                                    required
                                                    maxLength={50}
                                                />

                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter genre"
                                                    value={genre}
                                                    onChange={e => setGenre(e.target.value)}
                                                    maxLength={50}
                                                    required
                                                />

                                            </Form.Group>
                                        </Row>
                                        <Form.Group as={Col} md="12" className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                required
                                                as="textarea"
                                            />

                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>ISBN</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter isbn"
                                                    value={isbn}
                                                    onChange={e => setIsbn(e.target.value)}
                                                    maxLength={20}
                                                    required
                                                />

                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    required={bookId ? false : true}
                                                    accept="image/*"
                                                    onChange={e => setImage(e.target.files[0])}
                                                />
                                                {bookId && <a href={book?.image} target='_blank' rel="noreferrer">Uploaed
                                                    image</a>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Publish Date</Form.Label>

                                                <DatePicker
                                                    value={published}
                                                    className="form-control"
                                                    required
                                                    onChange={(date) => {
                                                        setPublished(moment(date).format('DD-MM-YYYY'));
                                                    }}
                                                />

                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>Publisher</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter isbn"
                                                    required
                                                    value={publisher}
                                                    maxLength={100}
                                                    onChange={e => setPublisher(e.target.value)}
                                                />

                                            </Form.Group>
                                        </Row>


                                        {isSubmitting ?
                                            <Button variant="primary" type="submit">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> Submitting...
                                            </Button>
                                            :
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        }
                                        {isSubmitError && <p className="text-danger">{isSubmitError}</p>}
                                    </Form>
                                }
                            </Container>
                        </Card.Body>
                    </Card>

                </Container>
            </main>
        </HelmetProvider>
    )
}

export default BookAdd;