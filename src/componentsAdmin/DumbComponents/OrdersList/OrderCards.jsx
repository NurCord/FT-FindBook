import React from 'react'
import OrderCard from './OrderCard'

export default function OrderCards({ orderUser }) {
  return (
    <div>
        {orderUser && orderUser?.map(order => {
            return <OrderCard 
                key={order.order.id} 
                id={order.order.id}
                user_id={order.order.user_id}
                totalPrice={order.order.totalPrice}
                status={order.order.status}
                items={order.order.items}
                user={order.user} 
                />
        })
        }
    </div>
  )
}