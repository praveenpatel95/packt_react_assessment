import React from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

function Home(){
   return (
       <HelmetProvider>
           <Helmet>
               <title>Find the book</title>
           </Helmet>
           <section className="text-center pt-3">
               <h1>Find your book</h1>
               <p>Click on above menu search icon for find the book.</p>
           </section>
       </HelmetProvider>
   )
}
export default Home