import React, { createContext, useContext, useState, useEffect } from 'react'
import { setStorageItem, getStorageItem } from '../../utils/localStorage'

// Создаем контекст
const CartContext = createContext()

// Провайдер корзины
export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    // Загружаем корзину из localStorage при инициализации
    useEffect(() => {
        const savedCart = getStorageItem('cart')
        if (savedCart) {
            setProducts(savedCart)
        }
    }, [])

    // Добавить товар в корзину
    const addToCart = (product) => {
        const isProductInCart = products?.find(item => item?.id === product?.id)

        if(isProductInCart) {
            updateQuantityInCart(product?.id, isProductInCart?.cartQuantity + 1)
            return
        }
        const newProducts = [...products, product]
        setProducts(newProducts)
        setStorageItem('cart', newProducts)
    }

    // Обновление количества товара в корзине
    const updateQuantityInCart = (productId, quantity) => {
        const newProducts = products?.map(item => {
            if(item?.id === productId) {
                return { ...item, cartQuantity: quantity }
            }
            return item
        })
        setProducts(newProducts)
        setStorageItem('cart', newProducts)
    }

    // Удалить товар из корзины
    const removeFromCart = (productId) => {
        const newProducts = products?.filter(item => item?.id !== productId)
        setProducts(newProducts)
        setStorageItem('cart', newProducts)
    }


    // Здесь добавлена функция удаления всех товаров из корзины 
    /**
     * @return {} Возвращает состояние пустого массива товаров вкорзине
     */
    const removeAllProducts = () => {
        setProducts([])
    }
    

    // Получение общего количества товара в корзине
    const getTotalQuantity = () => {
        let totalQuantity = 0;

        if(products.length > 0) {
            products.forEach(product => {
                if(product?.cartQuantity) totalQuantity += product?.cartQuantity;
            });
            return totalQuantity;
        }
    }

    // Получение общей стоимости товаров в корзине
    const getTotalPrice = () => {
        let totalPrice = 0;
        
        products.forEach(product => {
            if(product?.cartQuantity) totalPrice += product?.price * product?.cartQuantity;
        });

        return totalPrice.toFixed(2);


        
    }

    return (
        <CartContext.Provider value={{ 
            products, 
            addToCart,
            updateQuantityInCart,
            removeFromCart,
            removeAllProducts,
            getTotalQuantity,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

// Хук для использования корзины
export const useCart = () => {
    return useContext(CartContext)
}