import React from 'react'
import FavoCard from './FavoCard'

function FavoCards({ books }) {
    return (
        <div>
            {books && books?.map(book => {
                return <FavoCard
                    key={book.id}
                    id={book.id}
                    name={book.name}
                    image={book.image}
                    author={book.author}
                    price={book.price}
                    language={book.language}
                />
            })
            }
        </div>
    )
}

export default FavoCards