import React from "react";
import {Card} from "react-bootstrap";
import moment from "moment/moment";

function BookCard({book}) {
    return (
        <Card>
            <Card.Img variant="top" src={book?.image} height="180"/>
            <Card.Body>
                <h5 class="text-info">
                    {book?.title}
                </h5>
                {book?.description.length > 120 ?
                    <Card.Text>{`${book?.description.substring(0, 120)}...`}</Card.Text>
                    :
                    <Card.Text>{book?.description}</Card.Text>
                }
                <Card.Text className="text-grey-dark">By {book?.author}</Card.Text>
                <Card.Text>{moment(book?.published).format("MMM YYYY")}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BookCard;