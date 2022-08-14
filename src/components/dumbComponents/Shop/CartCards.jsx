import React from 'react'
import CartCard from './CartCard'

export default function CartCards({ books, cantidad}) {
  return (
    <div>
        {books && books?.map(book => {
            return <CartCard 
                key={book.id} 
                id={book.id}
                name={book.name}
                image={book.image}
                author={book.author}
                price={book.price}
                cantidad={cantidad}/>
        })
        }
    </div>
  )
}
