import React, {useEffect, useState} from "react";
import {Accordion, Form} from "react-bootstrap";
import {getBookFiltersList} from "../../stores/Books/actions";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";

function BookFilters({
                         authorsChecked, setAuthorsChecked, setPage,
                         genreChecked, setGenreChecked,
                         publisherChecked, setPublisherChecked
})
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookFiltersList())

    }, [dispatch]);

    const {bookFilters, isFetchingFilters} = useSelector(state => state?.BookReducer);

    const handleAuthors = (event) => {

        const target = event.target;
        var value = target.value;
        if(target.checked){
            setAuthorsChecked([...authorsChecked, value]);
        }else{
            setAuthorsChecked(
                authorsChecked.filter((author) => author !== value),
            );
        }
        setPage(1);
    }

    const handleGenre = (event) => {
        const target = event.target;
        var value = target.value;
        if(target.checked){
            setGenreChecked([...genreChecked, value]);
        }else{
            setGenreChecked(
                genreChecked.filter((genre) => genre !== value),
            );
        }
        setPage(1);
    }

    const handlePublisher = (event) => {
        const target = event.target;
        var value = target.value;
        if(target.checked){
            setPublisherChecked([...publisherChecked, value]);
        }else{
            setPublisherChecked(
                publisherChecked.filter((publisher) => publisher !== value),
            );
        }
        setPage(1);
    }


    return (
        <>
            {isFetchingFilters ?
                <Loader/>
                :
                <Accordion defaultActiveKey="0">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Authors</Accordion.Header>
                        <Accordion.Body>
                            {
                                bookFilters['authors']?.map((author, index) => (
                                    <Form.Group className="mb-3" controlId={author}>
                                        <Form.Check type="checkbox"
                                                    onChange={e => handleAuthors(e)}
                                                    label={author}
                                                    value={author}
                                                    checked={authorsChecked.some((authorCheck) => authorCheck === author)}

                                        />
                                    </Form.Group>
                                ))
                            }
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Genre</Accordion.Header>
                        <Accordion.Body>
                            {
                                bookFilters['genre']?.map((genre, index) => (
                                    <Form.Group className="mb-3" controlId={genre}>
                                        <Form.Check type="checkbox"
                                                    onChange={e => handleGenre(e)}
                                                    label={genre}
                                                    value={genre}
                                                    checked={genreChecked.some((genreCheck) => genreCheck === genre)}
                                        />
                                    </Form.Group>
                                ))
                            }
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Publisher</Accordion.Header>
                        <Accordion.Body>
                            {
                                bookFilters['publisher']?.map((publisher, index) => (
                                    <Form.Group className="mb-3" controlId={publisher}>
                                        <Form.Check type="checkbox"
                                                    onChange={e => handlePublisher(e)}
                                                    label={publisher}
                                                    value={publisher}
                                                    checked={publisherChecked.some((publisherCheck) => publisherCheck === publisher)}
                                        />
                                    </Form.Group>
                                ))
                            }
                        </Accordion.Body>
                    </Accordion.Item>


                </Accordion>
            }
        </>
    )
}

export default BookFilters;