import React from "react";
import TableRow from "./TableRow";

/**
 * Компонент таблица.
 * @param {Array} headers - Названия столбцов в шапке таблицы.
 * @param {Array} data - Содержимое таблицы.
 * @param {() => void} onDoubleClick - Двйоной клик.
 * @param {string} title - Заголовок.
 */
export const Table = ({ data, headers, onDoubleClick, title }) => {
  return (
    <div className="w-full">
      {title && <h2 className="text-3xl font-bold mb-3">{title}</h2>}
      <div className="flex flex-row">
        {headers?.length > 0 &&
          headers?.map((header, index) => (
            <div
              key={index}
              className="leading-10 px-2 text-base font-bold bg-gray-200 flex items-center border border-gray-300 flex-grow w-2"
            >
              {header?.name}
            </div>
          ))}
      </div>
      {data?.length > 0 &&
        data?.map((dataInfo, index) => (
          <TableRow
            key={index}
            rowData={dataInfo}
            headers={headers}
            onDoubleClick={onDoubleClick}
          />
        ))}
    </div>
  );
};
