import React, {useState} from 'react';
import {Button, Form, Offcanvas} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/fontawesome-free-solid";
import {useNavigate} from "react-router-dom";

function Search(...props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchValue, setSearchValue] =  useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleClose();
        navigate(`/search?q=${searchValue}`);
    }


    return (
        <>
            <Button variant="outline-primary border-2" size="sm" onClick={handleShow} className="me-2">
                <FontAwesomeIcon icon={faSearch}/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="top">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="primary-text">Search Book</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 theme_border_1"
                            aria-label="Search"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            required={true}
                        />
                        <Button variant="primary" type="submit" size="sm">Search</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default Search;