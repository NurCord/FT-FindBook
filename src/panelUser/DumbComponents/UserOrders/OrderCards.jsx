import React from 'react'
import OrderCard from './OrderCard'

export default function OrderCards({ orderUser }) {
  return (
    <div>
        {orderUser && orderUser?.map(order => {
            return <OrderCard 
                key={order.id} 
                id={`${order.id?.slice(0,9)}...${order.id?.slice(-5)}`}
                user_id={order.user_id}
                totalPrice={order.totalPrice}
                status={order.status}
                items={order.items}
                />
        })
        }
    </div>
  )
}