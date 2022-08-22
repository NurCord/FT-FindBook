import React from 'react'
import OrderCard from './OrderCard'

export default function OrderCards({ orderUser }) {
  return (
    <div>
        {orderUser && orderUser?.map(order => {
            return <OrderCard 
                key={order.id} 
                id={order.id}
                totalPrice={order.totalPrice || order.item.total}
                status={order.status || order.item.status}
                />
        })
        }
    </div>
  )
}