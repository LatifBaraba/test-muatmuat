'use client'
import Card from '@/components/card'
import ModalProduct from '@/components/modalProduct'
import useProductStore from '@/store/productStore'
import { Button, Input } from 'antd'
import { useState } from 'react'
import type { GetProps } from 'antd'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  type SearchProps = GetProps<typeof Input.Search>

  const { Search } = Input

  const showModal = () => setIsModalOpen(true)

  const handleOk = () => setIsModalOpen(false)

  const handleCancel = () => setIsModalOpen(false)

  const { search, products, setSearch } = useProductStore()

  const onSearch: SearchProps['onSearch'] = (value) => setSearch(value)
  console.log(search)

  return (
    <div className="flex flex-col not-only-of-type:min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Search
            placeholder="Search Product"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={showModal}>
            Add New Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card */}
        {search.length > 0 &&
          search.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              picture={item.picture}
              stock={item.stock}
            />
          ))}
        {search.length == 0 &&
          products?.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              picture={item.picture}
              stock={item.stock}
            />
          ))}
      </div>
      <ModalProduct
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mode="add"
      />
    </div>
  )
}
