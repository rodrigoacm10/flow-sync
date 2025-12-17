import { type Order, type OrderProduct } from '@prisma/client'
import { Checkbox } from './ui/checkbox'
import { api } from '@/lib/api'
import { useState } from 'react'
import { useOrders } from '@/hooks/useOrders'

const checkOrder = async ({
  orderId,
  to,
}: {
  orderId: string
  to: boolean
}) => {
  const response = await api.post('/order/check', { orderId, to })

  console.log('reponse ->', response)

  return response
}

export const OrderCard = ({
  order,
}: {
  order: Order & { orderProducts: OrderProduct[] }
}) => {
  const [checked, seChecked] = useState(order.concluded)
  console.log('ORDER -><>', order)
  const { changeStatus } = useOrders()

  return (
    <div className="bg-[#2b2b2b] rounded-xl px-6 py-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="font-bold">12:59</p>
          <p className="font-bold">-</p>

          <p className="font-bold">
            R${' '}
            {order?.orderProducts?.reduce(
              (acc, orderProduct) =>
                (acc += orderProduct.price * orderProduct.quantity),
              0,
            )}
          </p>
        </div>

        {/* <input
          className="bg-amber-700 p-4 w-4 h-4 rounded-lg"
          type="checkbox"
          name="completed"
        ></input> */}
        <Checkbox
          checked={checked}
          onClick={async () => {
            const response = await checkOrder({
              orderId: order.id,
              to: !order.concluded,
            })

            if (response.status === 200) {
              seChecked((checked) => !checked)
              changeStatus()
            }
          }}
        />
      </div>

      <div className="flex gap-2 mt-1">
        <p className="">{order.clientName}</p>
      </div>

      <div className="grid grid-cols-3  mt-1 gap-2">
        {order?.orderProducts?.map((orderProduct) => (
          <OrderProduct key={orderProduct.id} orderProduct={orderProduct} />
        ))}
        {/* <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct /> */}
      </div>
    </div>
  )
}

const OrderProduct = ({ orderProduct }: { orderProduct: OrderProduct }) => {
  return (
    <div className="text-sm">
      <p>
        {orderProduct.quantity}x R$ {orderProduct.price} -{' '}
        {orderProduct.productName}
      </p>
    </div>
  )
}
