import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon/Icon";
import { useCart } from "../context/CartContext";
import { Modal } from "../ui/Modal/Modal";
import { Alert } from "../ui/Alert/Alert";
import { useDisclosure } from "../hooks/useDisclosure";
import { Stepper } from "../ui/Stepper/Stepper";

 export const BasketList = () => {
    // Получение товаров из корзины
    const { products, updateQuantityInCart, removeAllProducts, getTotalPrice } = useCart()

    // Состояние для показа/скрытия модалки подтверждения удаления товара
    const { 
        isOpen: isOpenConfirmation, 
        onOpen: onOpenConfirmation, 
        onClose: onCloseConfirmation 
    } = useDisclosure()

    const { 
        isOpen: isOpenConfirmationRemoveAll, 
        onOpen: onOpenConfirmationRemoveAll, 
        onClose: onCloseConfirmationRemoveAll
    } = useDisclosure()

  // Состояние для показа/скрытия уведомления
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Состояние для хранения - отмечен ли checkbox
  const [isChecked, setChecked] = useState(false)
  

  // Состояние кнопки "Удалить всё"  
  const [isOnDisabledRemoveAll, setOnDisabledRemoveAll] = useState(false)

  // Обработка клика по кнопке "Удалить все"
  const handleRemoveAll = () => {
    // отмечаются все checkbox
    setChecked(true)
    // открывается модальное окно для подтверждения действия по удалению всех товаров из корзины
    onOpenConfirmationRemoveAll();    
  } 

  /**
   *  Функция удаления галочек из checkbox при неподтверждении действия по удалению всех товаров из корзины */
  const handleChangeCheckbox = () => {    
    setChecked(false)
  }

  // Функция  блокировки кнопки "Удалить всё" (устанавливается состояние disabled)
  const handleDisabledRemoveAll = () => {
    setOnDisabledRemoveAll(true)    
  }

  // Функция изменения цветв фона кнопки "Удалить всё" с индиго на серый при блокировке кнопки
  const handleDisabledRemoveAllBg = () => {
    return isOnDisabledRemoveAll ? "hover:bg-gray-200 border-white-400" : "hover:bg-indigo-400 border-indigo-400"
  }

  return (
    <section className="bg-white py-3 antialiased dark:bg-gray-900">
    
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-4xl font-medium mt-3 text-gray-900">Shopping Cart</h2>

    <button 
    // Блокировка кнопки "Удалить всё"
    disabled={isOnDisabledRemoveAll}
    // Обработчик события клик по кнопке "Удалить всё"
    onClick={ handleRemoveAll }
    // Замена классов при блокировке кнопки "Удалить всё"
    className={`border  rounded-md text-indigo-500 hover:text-white  cursor-pointer w-25 h-10 mt-5 mb-5 ${handleDisabledRemoveAllBg()}`}>Удалить все</button> 
    {products?.length > 0 ? (        
        <div  className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
            {products?.length > 0 && products?.map((product) => (
                <div key={product?.id} className="card rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6 cursor-pointer">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        {/* В чекбоксах появляются галочки при нажатии на кнопку "Удалить все" */}
                        <input className="w-5 h-5 border" type="checkbox"
                          checked={ isChecked }
                        />                        
                        <img src={product?.imgSrc} alt={product?.name} className="w-20 h-20 object-cover shrink-0 md:order-1" />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <Stepper
                                quantityValue={product?.cartQuantity}
                                onQuantityUpdate={(quantity) => updateQuantityInCart(product?.id, quantity)}
                            />
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">${product?.price}</p>
                            </div>
                        </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">{product?.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
                        {product?.description}
                        </span>
                        <div className="flex items-center gap-4">
                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 cursor-pointer dark:text-gray-400 dark:hover:text-white">
                            <Icon name="favorite" />
                            Add to favorites
                        </button>
                        <button onClick={() => {
                            onOpenConfirmation()
                        }} type="button" className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-500 cursor-pointer">
                            <Icon name="close" />
                            Remove
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
        {/* Order summary block */} 
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
            <div className="space-y-4">
            <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd className="text-base font-medium text-green-600">-$0</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                </dl>
            </div>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">${getTotalPrice()}</dd>
            </dl>
            </div>
            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>
            <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link
                to="/"
                className="inline-flex items-center text-sm text-indigo-600 py-3 gap-1"
            >                  
                Proceed to Checkout
                <Icon 
                name="chevron-right" 
                className="fill-indigo-600"
                />
            </Link>
            </div>
        </div>
        </div>
    </div>
    ) : (
        <p className="text-gray-500 dark:text-gray-400">No items in the basket</p>
    )}
    </div>
    <Modal
      isOpen={isOpenConfirmationRemoveAll}
      title="Подтвердите действие"
      onClose={() => {onCloseConfirmationRemoveAll();
        //Удаление галочек
                    handleChangeCheckbox() ;}
      }
      footer={
        <>
            <button 
                onClick={() => {
                    onCloseConfirmationRemoveAll()
                    //Удаление галочек
                    handleChangeCheckbox()                    
                }} 
                type="button" 
                className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
            >
                Отмена
            </button>
            <button onClick={() => {
                // Закрытие модалки
                onCloseConfirmationRemoveAll()
                //Удаление всех товаров из корзины
                removeAllProducts()
                //Блокировка кнопки "Удалить всё"
                handleDisabledRemoveAll()
                onOpen()
                }} 
                type="button" 
                className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-500 cursor-pointer"
            >
                Подтвердить
            </button>            
        </>
      }
    >
      <p>Вы уверены, что хотите удалить все товары из корзины?</p>
    </Modal>
    <Modal
      isOpen={isOpenConfirmation}
      title="Подтвердите действие"
      onClose={() => onCloseConfirmation()}
      footer={
        <>
            <button 
                onClick={() => onCloseConfirmation()} 
                type="button" 
                className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
            >
                Отмена
            </button>
            <button onClick={() => {
                onCloseConfirmation()
                onOpen()
                }}
                type="button" 
                className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-500 cursor-pointer"
            >
                Подтвердить
            </button>
        </>
      }
    >
      <p>Вы уверены, что хотите удалить этот товар из корзины?</p>
    </Modal>
    <Alert
      title="Действия удаления товара из корзины"
      subtitle="Товар успешно удален из корзины"
      variant="success"
      isOpen={isOpen}
      onClose={() => onClose()}
    />
    </section>
  );
};