import React, { useState, useEffect } from 'react'
import { FetchWrapper } from '../../api/fetchWrapper'
import { Table } from '../ui/Table/Table'
import { useDisclosure } from '../hooks/useDisclosure'
import { Drawer } from '../ui/Drawer/Drawer'
import { Alert } from '../ui/Alert/Alert'

// Получаем URL API из переменных окружения
const API_URL = import.meta.env.VITE_API_URL

const NOTIFICATION_TEXT = {
  add: {
    title: 'Добавление продукта',
    subtitle: 'Продукт успешно добавлен'
  },
  update: {
    title: 'Редактирование продукта',
    subtitle: 'Продукт успешно обновлен'
  },
  delete: {
    title: 'Удаление продукта',
    subtitle: 'Продукт успешно удален'
  }
}

export const Admin = () => {
    // состояние для продуктов
    const [products, setProducts] = useState([])

    // состояние текста в уведомлении
    const [notificationText, setNotificationText] = useState(NOTIFICATION_TEXT.add)
    // режим редактирования
    const [isEdit, setIsEdit] = useState(false)

    // состояние для обработки формы
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        rating: '',
        price: ''
    })

    // кастомный хук для сайдбара
    const { isOpen, onOpen, onClose } = useDisclosure()

    // показ уведомления
    const { 
      isOpen: isOpenNotification, 
      onOpen: onOpenNotification, 
      onClose: onCloseNotification 
    } = useDisclosure()

    // Функция загрузки продуктов
    const fetchProducts = async () => {
      const data = await FetchWrapper.get(`${API_URL}/products`)
      setProducts(data)
    }

    // Загрузка продуктов при монтировании компонента
    useEffect(() => {
      fetchProducts()
    }, [])

  // обработчик изменения формы
  const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
  }

  // обработчик отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault()
    if(isEdit) {
      await FetchWrapper.put(`${API_URL}/products/${formData.id}`, formData)
      setNotificationText(NOTIFICATION_TEXT.update)
      onOpenNotification()
    } else {
      await FetchWrapper.post(`${API_URL}/products`, formData)
      setIsEdit(false)
      setNotificationText(NOTIFICATION_TEXT.add)
      onOpenNotification()
    }
    // Обновляем список продуктов после создания/редактирования
    await fetchProducts()
    onClose()
    setFormData({
      id: '',
      name: '',
      description: '',
      category: '',
      rating: '',
      price: ''
    })
  }

  // обработчик двойного клика в строке таблицы
  const handleDoubleClick = (product) => {
    onOpen() // открываем сайдбар в режиме редактирования
    setIsEdit(true)
    setFormData({
      id: product?.id,
      name: product?.name,
      description: product?.description,
      category: product?.category,
      rating: product?.rating,
      price: product?.price
    })
  }

  // обработчик удаления продукта
  const handleDelete = async (product) => {
    if (window.confirm(`Вы уверены, что хотите удалить "${product.name}"?`)) {
      await FetchWrapper.delete(`${API_URL}/products/${product.id}`)
      // Обновляем список продуктов после удаления
      await fetchProducts()
      // Закрываем drawer
      onClose()
      // Сбрасываем форму
      setFormData({
        id: '',
        name: '',
        description: '',
        category: '',
        rating: '',
        price: ''
      })
      setIsEdit(false)
      setNotificationText(NOTIFICATION_TEXT.delete)
      onOpenNotification()
    }
  }

  return (
    <section id='home'>
      <div className='container max-w-7xl mx-auto'>
        <button onClick={onOpen} className='bg-indigo-600 text-white px-4 py-2 rounded-md mb-3 cursor-pointer'>Add Product</button>
        <Table 
            data={products} 
            headers={[
                { name: 'Name', key: 'name' },
                { name: 'Category', key: 'category' },
                { name: 'Description', key: 'description' },
                { name: 'Price', key: 'price' },
                { name: 'Rating', key: 'rating' },
            ]} 
            title='Products'
            onDoubleClick={handleDoubleClick}
        />
        <Drawer isOpen={isOpen} onClose={() => {
          onClose()
          setFormData({
            name: '',
            description: '',
            category: '',
            rating: '',
            price: ''
          })
          setIsEdit(false)
        }} title={formData.id ? 'Edit Product' : 'Add Product'}>
          <form onSubmit={handleSubmit}>
              <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name*</label>
                  <input 
                      type="text"
                      name="name"
                      value={formData.name} 
                      onChange={handleChange} 
                      id="name" 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" placeholder="Enter name" 
                      required 
                  />
              </div>
              <div className="mb-5">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                  <textarea 
                      name="description"
                      value={formData.description} 
                      onChange={handleChange} 
                      id="description" 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light resize-none" placeholder="Enter description" rows="3"
                      required 
                  ></textarea>
              </div>
              <div className="mb-5">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category*</label>
                  <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleChange} 
                      id="category" 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" 
                      required 
                  >
                    <option value="">Select category</option>
                    <option value="Chair">Chair</option>
                    <option value="Bed">Bed</option>
                    <option value="Bench">Bench</option>
                    <option value="Children's Furniture">Children's Furniture</option>
                    <option value="Sofa Beds">Sofa Beds</option>
                  </select>
              </div>
              <div className="mb-5">
                  <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating*</label>
                  <input 
                      type="number"
                      name="rating"
                      value={formData.rating} 
                      onChange={handleChange} 
                      id="rating" 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" 
                      required 
                  />
              </div>
              <div className="mb-5">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price*</label>
                  <input 
                      type="number"
                      name="price"
                      value={formData.price} 
                      onChange={handleChange} 
                      id="price" 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" 
                      required 
                  />
              </div>
              <div className="flex gap-2">
               {isEdit ? (
                 <>
                   <button type="submit" className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Редактировать</button>
                   <button type="button" onClick={()=> handleDelete(formData)} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Удалить</button>
                 </>
               ) : (
                 <>
                   <button type="button" onClick={onClose} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                   <button type="submit" className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                 </>
               )}
              </div>
          </form>
        </Drawer>
        <Alert 
          isOpen={isOpenNotification} 
          onClose={onCloseNotification} 
          variant='info' 
          title={notificationText?.title} 
          subtitle={notificationText?.subtitle} 
        />
      </div>
    </section>
  )
}