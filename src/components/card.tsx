import React, { useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import type { PopconfirmProps } from 'antd'
import { message, Popconfirm } from 'antd'
import { ProductInterface } from '@/types'
import useProductStore from '@/store/productStore'
import ModalProduct from './modalProduct'

const Card = (data: ProductInterface) => {
  const { id, name, price, picture, stock } = data
  const { removeProduct, setProduct } = useProductStore()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => setIsModalOpen(true)

  const handleOk = () => setIsModalOpen(false)

  const handleCancel = () => setIsModalOpen(false)

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    await removeProduct(id)
    message.success('Success Remove Product')
  }

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e)
  }

  const handleEditProduct = () => {
    setProduct({ ...data })
    showModal()
  }

  return (
    <div className="flex flex-col gap-2 bg-slate-800 rounded-2xl p-3 justify-center">
      {/* image */}
      <img src={picture} alt="" />
      {/* desc */}
      <div className="flex flex-col gap-3">
        {/* name & stock */}
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-cyan-500 text-center">
            {name}
          </span>
          <span className="text-md font-semibold text-center">
            Stock : {stock}
          </span>
        </div>
        {/* price */}
        <span className="text-center">Rp {price}</span>
      </div>
      {/* footer */}
      <div className="flex gap-2 justify-end">
        <div
          className="group p-2 bg-slate-600 rounded-full hover:scale-125 cursor-pointer transition duration-300 ease-in-out"
          onClick={handleEditProduct}
        >
          <Pencil className="size-4 group-hover:text-blue-400" />
        </div>

        <Popconfirm
          title="Delete Product"
          description="Are you sure to delete this Product?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <div className="group p-2 bg-slate-600 rounded-full hover:scale-125 cursor-pointer transition duration-300 ease-in-out">
            <Trash className="size-4 group-hover:text-red-400" />
          </div>
        </Popconfirm>
      </div>
      <ModalProduct
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mode="edit"
      />
    </div>
  )
}

export default Card
