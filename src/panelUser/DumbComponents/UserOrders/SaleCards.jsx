import React from 'react'
import SaleCard from './SaleCard'

export default function SaleCards({salesUser }) {
  return (
    <div>
        {salesUser && salesUser?.map(sale => {
            return <SaleCard 
                key={sale.id} 
                id={sale.id}
                totalPrice={sale.item.total}
                status={sale.item.status}
                libroid={sale.item.libro_id}
                />
        })
        }
    </div>
  )
}