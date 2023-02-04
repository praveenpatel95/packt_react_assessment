import React from "react";
import {Pagination} from "react-bootstrap";

function BookPagination({bookList, setPage}) {
    return (
        <Pagination>
            <Pagination.First onClick={() => setPage(1)}
                              disabled={bookList?.current_page === 1 ?? true}/>
            {
                bookList?.links?.map((bookLink, index) => (
                    <>
                        {index === 0 ?
                            <Pagination.Prev
                                onClick={() => setPage(bookList?.current_page - 1)}
                                disabled={bookLink?.url === null ?? true}/>

                            : bookLink?.label === "Next &raquo;" ?
                                <Pagination.Next
                                    onClick={() => setPage(parseInt(bookList?.current_page + 1))}
                                    disabled={bookLink?.url === null ?? true}/>

                                :
                                <Pagination.Item
                                    active={parseInt(bookList?.current_page) === parseInt(bookLink.label) ?? true}
                                    onClick={() => {
                                        parseInt(bookLink.label) && setPage(parseInt(bookLink.label))
                                    }
                                    }>{bookLink.label}</Pagination.Item>


                        }

                    </>

                ))}
            <Pagination.Last
                disabled={bookList?.current_page === bookList?.total / 10 ?? true}
                onClick={() => setPage(Math.ceil(bookList?.total / 10))}/>
        </Pagination>
    )
}

export default BookPagination;