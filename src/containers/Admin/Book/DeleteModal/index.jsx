import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {deleteBook, getBooksList} from "../../../../stores/Books/actions";
import {Alert, Spinner} from "react-bootstrap";

function DeleteModal({deleteId, setDeleteId, currentPage, perPage, total}) {


    const [show, setShow] = useState(true);

    const handleClose = () => {
        setDeleteId('');
        setShow(false);
    };

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteBook(deleteId));
    }
    const {isBookDeleting, isDeleted, deletingError} = useSelector(state => state?.BookReducer);

    useEffect(() => {
        if (isDeleted) {
            handleClose();
            var getPageNo = Math.ceil((total - 1) / 10);
            getPageNo = getPageNo > currentPage ? currentPage : getPageNo
            dispatch(getBooksList({page: getPageNo, perPage}));
        }
    }, [isDeleted, dispatch]);
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete it?</Modal.Body>
                <Modal.Footer>
                    {isBookDeleting ?
                        <Button variant="danger" disabled onClick={handleClose}>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Deleting...
                        </Button>

                        :
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Yes, Confirmed
                            </Button>
                        </>
                    }
                    {deletingError &&
                        <Alert variant="danger">
                            {deletingError}
                        </Alert>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;