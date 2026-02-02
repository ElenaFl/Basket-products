import React from "react";
import { Icon } from "../Icon/Icon";
import { useToggle } from "../../hooks/useToogle";

/**
 * Компонент карточка.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.name - Название карточки.
 * @param {string} props.details.category - Категория карточки (необязательно).
 * @param {string} props.details.description - Описание карточки (необязательно).
 * @param {string} props.details.price - Цена карточки (необязательно).
 * @param {number} props.details.rating - Рейтинг карточки (необязательно).
 * @param {string} props.details.imgSrc - Путь к изображению.
 */
export const Card = ({ details, onCardClick }) => {
  const { 
    name, 
    category, 
    description, 
    price, 
    rating, 
    imgSrc,
  } = details;


  // Переключение сохраненок
  const [isFavorite, toggleFavorite] = useToggle(details.isFavorite)

  return (  
    <div
      className="max-w-72 w-72 rounded-md overflow-hidden shadow-md hover:shadow-lg mb-1 cursor-pointer"
      onClick={onCardClick && (() => onCardClick(details?.id))}
    >
      <div className="relative">
        {imgSrc && (
          <img
            className="w-full max-h-44 min-h-36 object-cover"
            src={imgSrc}
            alt={name}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 transition-opacity duration-300 hover:opacity-50"></div>
        {price < 100 && (
          <div className="absolute top-0 right-0  bg-indigo-600 text-white px-2 py-1 m-2 rounded-md text-sm font-normal">
            SALE
          </div>
        )}
        <button 
          className={`absolute top-[7px] left-[7px] ${isFavorite ? "text-indigo-600" : "text-white"}`}
          onClick={(event) => {
            event.stopPropagation()
            toggleFavorite()
          }}
        >
          <Icon name="favorite" />
        </button>
      </div>
      <div className="p-4">
        {name && (
          <h3 className="text-lg font-medium mb-2 text-zinc-800 line-clamp-1 overflow-hidden text-ellipsis">
            {name}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 overflow-hidden text-ellipsis">
            {description}
          </p>
        )}
        {category && <p className="text-gray-600 text-sm mb-4">{category}</p>}
        {rating && (
          <div className="flex items-center mb-4">
            <Icon name="star" className="fill-yellow-500 stroke-yellow-500" />
          </div>
        )}
        {price && (
          <div className="flex items-center justify-between">
            <span className="font-bold text-md text-zinc-800">{price}$</span>
          </div>
        )}
      </div>
    </div>
  );
};