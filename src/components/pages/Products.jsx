import React, { useState, useEffect } from 'react'
import { Card } from '../ui/Card/Card'
import { FetchWrapper } from '../../api/fetchWrapper'
import { useNavigate } from 'react-router-dom'

// Получаем URL API из переменных окружения
const API_URL = import.meta.env.VITE_API_URL

// Страница с продуктами
export const Products = () => {
  // состояние для продуктов
  const [products, setProducts] = useState([])
  // переход на страницу с деталями
  const navigate = useNavigate()

  // загрузка продуктов
  useEffect(() => {
    const fetchProducts = async () => {      
        const data = await FetchWrapper.get(`${API_URL}/products`)
        setProducts(data)
    }
    fetchProducts()
  }, [])

  console.log('products', products)

  const handleDetails = (id) => {
    console.log('id', id)
    navigate(`/products/${id}`)
  }

  return (
    <section id='products'>
      <div className='container max-w-7xl mx-auto'>
        <h2 className='text-4xl font-medium mb-4'>Products</h2>
        <div className='grid grid-cols-4 gap-4'>
            {products?.length > 0  && products?.map((product) => (
              <Card key={product?.id} details={product} onCardClick={handleDetails} />
            ))}
        </div>
      </div>
    </section>
  );
};