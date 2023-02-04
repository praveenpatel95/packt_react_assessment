import Home from "../containers/Home";
import {Route, Routes} from "react-router-dom";
import Book from "../containers/Admin/Book";
import WebLayout from "../containers/WebLayout";
import SearchResult from "../containers/Books/SearchResult";
import BookAdd from "../containers/Admin/Book/AddEdit";

export default function MainRouter() {
    return (
        <Routes>
            <Route element={<WebLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<SearchResult/>}/>


                <Route path="/admin/books" element={<Book/>} />
                <Route path="/admin/book/add" element={<BookAdd />} />
                <Route path="/admin/book/edit/:bookId" element={<BookAdd />} />
            </Route>
        </Routes>
    )
}
