import React from "react";

/**
 * Компонент ячейка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {string} props.value - Содержимое ячейки.
 */
const TextCell = ({ value }) => (
  <div className="flex items-center text-sm border border-gray-300 flex-grow w-2 px-2 py-2" title={value}>
    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
      {value}
    </div>
  </div>
);

export default TextCell;
