import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Form } from "../Form/Form";
import { Alert } from "../Alert/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { useCart } from "../../context/CartContext";

/** Массив пунктов меню */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Empty", path: "/empty" },  
  { name: "Admin", path: "/admin" },
];

/**
 * Компонент Шапка.
 */
export const Header = () => {
  // показ модалки для входа
  const [isOpenLogin, setOpenLogin] = useState(false)
  // показ модалки для регистрации
  const [isOpenRegister, setOpenRegister] = useState(false)

  // показ notification
  const [isOpenNotification, setOpenNotification] = useState(false)
  

  // обработчик отправки формы для входа
  const handleLoginSubmit = (formData) => {
    console.log('данные из шапки', formData)
    if(formData.email && formData.password) {
      // закрываем модалку для входа
      setOpenLogin(false)
      // показ notification
      setOpenNotification(true)
    }
  }

  // получаем текущий путь из url
  const location = useLocation()

  // для программной навигации
  const navigate = useNavigate()

  // Закрашиваем активную ссылку в шапке
  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-indigo-500' : 'text-zinc-800'
  }

  // для показа количества товаров в корзине
  const { products, getTotalQuantity } = useCart()

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-2">
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex justify-between h-16">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="w-36 object-contain"
                src="../../../assets/header/logo.svg"
                alt="Logo"
              />
            </Link>
            <nav className="flex-1 flex items-center justify-between ml-20 max-w-70 mr-auto">
              {navItems?.length > 0 && navItems?.map((item) => {
                  return (
                  <Link
                      to={item?.path}
                      key={item?.name}
                      className={`inline-flex items-center font-medium text-sm hover:text-indigo-500 ${isActiveLink(item?.path)}`}
                  >
                      {item?.name}
                  </Link>
                  );
              })}
            </nav>
            <button
              onClick={() => navigate("/basket")}
              id="cart"
              type="button"
              className={`relative cursor-pointer bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500   ${
                location?.pathname === "/basket" ? "text-indigo-500 hover:text-indigo-500" : ""
              }`}
            >
              {products?.length > 0 && (
                <span className="absolute top-3 right-1 bg-indigo-600 text-white text-[12px] rounded-full w-[14px] h-[14px] flex items-center justify-center">
                  {getTotalQuantity()}
                </span>
              )}
              <Icon name="basket"/>
            </button>
            <div className="flex items-center">
                <button
                    type="button"
                    className="cursor-pointer ml-2 text-indigo-600 hover:text-indigo-500 font-medium text-sm px-5 py-2.5 text-center"
                    onClick={()=> setOpenLogin(true)}
                    >
                    Login
                </button>
                <button
                    type="button"
                    onClick={()=> setOpenRegister(true)}
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Register
                </button>
            </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenLogin}
        onClose={() => setOpenLogin(false)}
        title="Login"
      >
        <Form type="login" onSubmit={handleLoginSubmit}/>
      </Modal>
      <Alert
        isOpen={isOpenNotification}
        onClose={() => setOpenNotification(false)}
        title="Действия входа"
        subtitle="Вы успешно вошли в систему"
        variant="success"
      />
      <Modal
        isOpen={isOpenRegister}
        onClose={() => setOpenRegister(false)}
        title="Register"
      >
        <Form type="register" />
      </Modal>
    </header>
  );
};
