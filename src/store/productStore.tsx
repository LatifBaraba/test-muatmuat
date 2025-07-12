import { ProductInterface } from '@/types'
import { create } from 'zustand'
import dataJSON from '@/data/dataProduct.json'

interface ProductStoreInterface {
  products: ProductInterface[]
  product?: ProductInterface
  search: ProductInterface[]
  setSearch: (name: string) => void
  setProduct: (product: ProductInterface) => void
  addProduct: (product: ProductInterface) => void
  removeProduct: (id: string) => void
}

const initialValue = {
  id: '',
  name: '',
  price: 0,
  picture: '',
  stock: 0,
}

const useProductStore = create<ProductStoreInterface>((set) => ({
  products: dataJSON,
  product: initialValue,
  search: [],
  setSearch: (name: string) =>
    set((state) => ({
      search: state.products.filter((item) => item.name.includes(name)),
    })),
  setProduct: (product: ProductInterface) => set(() => ({ product: product })),
  addProduct: (product: ProductInterface) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    })),
}))

export default useProductStore
