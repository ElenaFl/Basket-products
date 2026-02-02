import React from "react";
import TextCell from "./TextCell";

/**
 * Строка таблицы.
 * @param {object} props.rowData - Объект с характеристиками передаваемой сущности.
 * @param {Array} props.headers - Заголовки таблицы.
 */
const TableRow = ({ rowData, headers, onDoubleClick }) => {
  // Обработчик двойного клика
  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(rowData);
    }
  };

  return (
    <div
      id={`row-${rowData.id}`}
      className="flex cursor-pointer hover:bg-gray-100"
      onDoubleClick={handleDoubleClick}
    >
      {headers?.length > 0 &&
        headers?.map((header) => (
          header.render
            ? (
              <TextCell key={header.key} value={header.render(rowData)} />
            )
            : (
              <TextCell key={header.key} value={rowData[header.key]} />
            )
        ))}
    </div>
  );
};

export default TableRow;
