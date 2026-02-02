import React, { useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";

/**
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @param {boolean} prop.isOpen - Компонент открыт или закрыт
 * @param {() => void} prop.onClose - Функция закрытия меню
 * @param {"left" | "right"} prop.align - Выравнивание меню
 * @param {string} prop.title - Заголовок
 * @param {React.ReactNode} props.footerContent - Подвал компонента
 */
export const Drawer = ({
  children,
  isOpen,
  onClose,
  align = "right",
  title,
  footerContent
}) => {
  // Создаем ссылку на DOM-элемент
  const drawerRef = useRef(null);

  // Обработчик клика за пределами
  const handleOutsideClick = useCallback(
    (event) => {
      if (drawerRef?.current && !drawerRef?.current?.contains(event?.target)) {
        // Закрываем только Drawer
        event?.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  // Обработчик нажатия клавиши Esc
  const handleKeyPress = useCallback(
    (event) => {
      if (event?.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document?.addEventListener("mousedown", handleOutsideClick, true);
      document?.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document?.removeEventListener("mousedown", handleOutsideClick, true);
      document?.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose, handleOutsideClick, handleKeyPress]);

  return (
    isOpen &&
    createPortal(
      <div className="absolute z-3 top-0 left-0 right-0 bottom-0 bg-opacity-30 bg-black/25">
        <aside
          ref={drawerRef}
          onMouseDown={(e) => e.stopPropagation()}
          className={`fixed top-0 bottom-0 ${
            align === "right" ? "right-0" : "left-0"
          } right-0 z-3 w-2/6 p-8 bg-white transition-transform duration-300 ease-in-out`}
        >
          <header className="flex justify-between mb-4">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 w-10 h-10 inline-flex justify-center items-center absolute top-4 right-4 text-xl cursor-pointer hover:bg-gray-100 rounded-md"
            >
              <Icon name="close" />
            </button>
          </header>
          <main className="pt-0 pb-0">{children}</main>
          {footerContent && (
            <footer className="flex justify-end absolute bottom-8 right-8">
              {footerContent}
            </footer>
          )}
        </aside>
      </div>,
      document.body
    )
  );
};
