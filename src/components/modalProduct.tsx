import { Button, Form, Input, InputNumber, message, Modal } from 'antd'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { uuid } from 'uuidv4'
import useProductStore from '@/store/productStore'

interface ModalProductInterface {
  open: boolean
  onOk: () => void
  onCancel: () => void
  mode: 'add' | 'edit'
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required' })
    .max(30, { message: 'Name should be less than 15 characters' }),
  price: z.number().min(1, { message: 'Required' }),
  stock: z.number().min(1, { message: 'Required' }),
})

const ModalProduct = ({
  open,
  onOk,
  onCancel,
  mode,
}: ModalProductInterface) => {
  const { addProduct, product, removeProduct } = useProductStore()

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: '', price: 0, stock: 0 },
    resolver: zodResolver(schema),
  })

  if (mode === 'edit' && product) {
    setValue('name', product.name, { shouldTouch: true })
    setValue('price', product.price, { shouldTouch: true })
    setValue('stock', product.stock, { shouldTouch: true })
  }

  const handleSubmitProduct = async (data: {
    name: string
    price: number
    stock: number
  }) => {

    const payload = {
      id: uuid(),
      picture: 'https://picsum.photos/200',
      name: data.name,
      price: data.price,
      stock: data.stock,
    }

    if (mode === 'edit' && product) {
      await removeProduct(product.id)
      await addProduct(payload)
      message.success('Success Edit Product')
    } else {
      await addProduct(payload)
      message.success('Success Add Product')
    }

    reset()
    onCancel()
  }

  return (
    <>
      <Modal
        title={`${mode === 'add' ? 'Add' : 'Edit'} Product`}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
      >
        <>
          <Form
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit((data) => handleSubmitProduct(data))}
          >
            <FormItem control={control} name="name" label="Name">
              <Input />
            </FormItem>
            <FormItem control={control} name="price" label="Price">
              <InputNumber<number>
                // initialValue={1000}
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                }
              />
            </FormItem>
            <FormItem control={control} name="stock" label="Stock">
              <InputNumber min={1} defaultValue={0} />
            </FormItem>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* <DevTool control={control} /> */}
        </>
      </Modal>
    </>
  )
}

export default ModalProduct
