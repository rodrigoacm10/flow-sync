import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useMemo, useState } from 'react'
import { SelectRegistred } from './order/SelectRegistred'
import { Combobox } from './Combobox'
import { Input } from './ui/input'

const mockCLient = [
  {
    id: '72d461c8-7fb2-4bc6-856f-eab6950b30ed',
    name: 'cliente-teste',
    saved: true,
    synced: false,
    userId: '56bc99cd-9dbc-4465-9e72-6c72fd7ab780',
    groupId: 'dc3b69e2-b80b-4013-8726-12032c48b96e',
    clientChips: [
      { chip: { value: 1000 } },
      { chip: { value: 1000 } },
      { chip: { value: 1000 } },
    ],
    orders: [],
    group: {
      id: 'dc3b69e2-b80b-4013-8726-12032c48b96e',
      name: 'teste-group',
      saved: true,
      synced: false,
      userId: '56bc99cd-9dbc-4465-9e72-6c72fd7ab780',
    },
  },
]

const mockProduct = [
  {
    id: '71e023a8-0d1d-4ae8-90aa-c34aacdca0dd',
    name: 'test-coxinha',
    value: 990,
    useQuantity: true,
    quantity: 50,
    saved: true,
    synced: false,
    userId: '56bc99cd-9dbc-4465-9e72-6c72fd7ab780',
    categoryId: 'e37a8ac2-84a6-4ad0-96ec-44ef82387a0e',
  },
]

const getDetails = ({
  id,
  values,
}: {
  id: string
  values: (any & { id: string })[]
}) => {
  return values.find((value) => value.id === id)
}

function todayISOInTimeZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

export function CreateOrder({ children }: React.ComponentProps<'div'>) {
  const userTimeZone = 'America/Recife'

  const [orderDate, setOrderDate] = useState(() =>
    todayISOInTimeZone(userTimeZone),
  )
  const [registredClient, setRegistredClient] = useState('registred')
  const [registredProduct, setRegistredProduct] = useState('registred')
  const [clientId, setClientId] = useState('')
  const [productId, setProductId] = useState('')
  const [quantityProduct, setQuantityProduct] = useState(1)
  const [priceProduct, setPriceProduct] = useState(1)
  const [nameProduct, setNameProduct] = useState('')
  const [orderProducts, setOrderProducts] = useState<any[]>([])
  const [nameClient, setNameClient] = useState('')

  const clientDetails = useMemo(() => {
    return clientId ? getDetails({ id: clientId, values: mockCLient }) : null
  }, [clientId])

  const clientValue = useMemo(() => {
    return clientDetails
      ? clientDetails.clientChips.reduce(
          (acc: number, value: any) => (acc += value.chip.value),
          0,
        )
      : null
  }, [clientDetails])

  const productDetails = useMemo(() => {
    if (registredProduct === 'registred') {
      return productId
        ? getDetails({ id: productId, values: mockProduct })
        : null
    } else if (registredProduct === 'notRegistred') {
      return quantityProduct && nameProduct && priceProduct
        ? {
            // id: '71e023a8-0d1d-4ae8-90aa-c34aacdca0dd',
            name: nameProduct,
            value: priceProduct,
            // useQuantity: false,
            quantity: quantityProduct,
            saved: true,
            synced: false,
            // userId: '56bc99cd-9dbc-4465-9e72-6c72fd7ab780',
            // categoryId: null,
          }
        : null
    }
  }, [productId, quantityProduct, priceProduct, nameProduct, registredProduct])

  const orderProductsUnique = useMemo(() => {
    const products: any[] = []

    for (const op of orderProducts) {
      const idx = products.findIndex((p) => p.productName === op.productName)

      if (idx >= 0) products[idx].quantity += op.quantity
      else
        products.push({
          ...op,
          quantity: op.quantity,
        })
    }

    return products
  }, [orderProducts])

  const orderProductsUniqueValue = useMemo(() => {
    return orderProductsUnique.length
      ? orderProductsUnique.reduce(
          (acc, value) => (acc += value.price * value.quantity),
          0,
        )
      : null
  }, [])

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Pedido</DialogTitle>
            <DialogDescription>
              Escolha se o cliente é avulso ou registrado
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              {/* coloque o valor como hoje e de acordo com o fuso horário do user  */}
              <Input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />

              <div className="border">tipo de cliente</div>
              <SelectRegistred
                type={registredClient}
                setType={setRegistredClient}
                onChange={() => {
                  setClientId('')
                  setNameClient('')
                }}
                placeholder="Selecionar tipo de cliente"
              />

              {registredClient === 'registred' ? (
                <div className="flex flex-col gap-2">
                  <Combobox
                    value={clientId}
                    setValue={setClientId}
                    values={mockCLient}
                    placeholder="Selecionar Clinete"
                    labelParam="name"
                    valueParam="id"
                  />
                  {clientId && (
                    <p className="font-bold text-sm">
                      Saldo do cliente:{' '}
                      {clientDetails.clientChips.reduce(
                        (acc: number, value: any) => (acc += value.chip.value),
                        0,
                      )}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <Input
                    value={nameClient}
                    onChange={(value) => setNameClient(value.target.value)}
                    placeholder="Nome do Cliente"
                  />
                </>
              )}

              <div className="border">tipo de produto</div>
              <SelectRegistred
                type={registredProduct}
                setType={setRegistredProduct}
                onChange={() => {
                  setProductId('')
                  setNameProduct('')
                  setQuantityProduct(1)
                  setPriceProduct(1)
                }}
                placeholder="Selecionar tipo de produto"
              />
              {registredProduct === 'registred' ? (
                <div className="flex gap-2">
                  <Input
                    type={'number'}
                    value={quantityProduct}
                    onChange={(e) => {
                      const n = Number(e.target.value)
                      setQuantityProduct(n > 0 ? n : 1)
                    }}
                  />
                  <Combobox
                    value={productId}
                    setValue={setProductId}
                    values={mockProduct}
                    placeholder="Selecionar Produto"
                    labelParam="name"
                    valueParam="id"
                  />
                  {productDetails && (
                    <div className="border flex items-center justify-center rounded-md px-2">
                      {productDetails.value * quantityProduct}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type={'number'}
                    value={quantityProduct}
                    onChange={(e) => {
                      const n = Number(e.target.value)
                      setQuantityProduct(n > 0 ? n : 1)
                    }}
                  />
                  <Input
                    value={nameProduct}
                    onChange={(value) => setNameProduct(value.target.value)}
                    placeholder="Nome do Produto"
                  />
                  <Input
                    type={'number'}
                    value={priceProduct}
                    onChange={(e) => {
                      const n = Number(e.target.value)
                      setPriceProduct(n > 0 ? n : 1)
                    }}
                  />
                </div>
              )}
              <Button
                type="button"
                onClick={() => {
                  console.log('AALGO ->', productDetails)
                  if (!productDetails) return

                  setOrderProducts((prev) => [
                    ...prev,
                    {
                      productName: productDetails.name,
                      productId: productDetails.id,
                      quantity: quantityProduct,
                      price: productDetails.value,
                      saved: true,
                      synced: false,
                    },
                  ])

                  setProductId('')
                  setPriceProduct(1)
                  setNameProduct('')
                  setQuantityProduct(1)
                }}
              >
                adicionar produto
              </Button>

              <div className="mt-1=">
                {orderProductsUnique.length ? (
                  orderProductsUnique.map((value) => {
                    return (
                      <div className="text-sm" key={value.productName}>
                        {value.quantity}x - {value.productName} - {value.price}
                      </div>
                    )
                  })
                ) : (
                  <div className="">
                    <p className="text-center text-xs">Nenhum produto</p>
                  </div>
                )}
              </div>

              <div className="h-[1px] bg-black/80"></div>

              <div className="flex flex-col text-sm">
                <p className="font-bold">
                  Total: {orderProductsUniqueValue || 0}
                </p>

                <p className="font-bold">
                  Saldo restante do cliente:{' '}
                  {clientValue - orderProductsUniqueValue || 0}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Criar Pedido</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
