import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";

/**
 * Компонент модальное окно.
 * @param {boolean} props.isOpen - Компонент открыт/закрыт.
 * @param {string} props.title - Заголовок компонента.
 * @param {Function} props.onClose - Коллбек для закрытия компонента.
 * @param {ReactNode} props.children - Дочерние элементы.
 * @param {string} props.className - Стили компонента.
 * @param {ReactNode} props.footer - Футер компонента.
 */
export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  className,
}) => {
  // Создаем ссылку на DOM-элемент
  const modalRef = useRef(null);

  // Обработчик клика за пределами
  const handleOutsideClick = useCallback(
    (event) => {
      if (modalRef?.current && !modalRef?.current?.contains(event?.target)) {
        // Закрываем только Modal
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
      document.body.style.overflow = "hidden";
    }
    return () => {
      document?.removeEventListener("mousedown", handleOutsideClick, true);
      document?.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, handleOutsideClick, handleKeyPress]);

  return (
    isOpen &&
    createPortal(
      <div className="fixed z-3 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/50">
        <div
          ref={modalRef}
          onMouseDown={(e) => e.stopPropagation()}
          className={`bg-white rounded-md w-[430px] ${className || ""}`}
        >
          <header className="flex justify-between relative min-h-10 border-gray-200 border-b-1 px-4 py-4">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 w-10 h-10 inline-flex justify-center items-center text-xl rounded-md cursor-pointer"
            >
              <Icon name="close" />
            </button>
          </header>
          <main className="p-4 min-h-36 overflow-y-auto max-h-[450px]">
            {children}
          </main>
          {footer && (
            <footer className="flex justify-end border-gray-200 border-t-1 px-4 py-4 gap-3">
              {footer}
            </footer>
          )}
        </div>
      </div>,
      document.body
    )
  );
};
