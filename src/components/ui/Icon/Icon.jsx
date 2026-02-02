import React from "react";

/**
 * Компонент иконка.
 * @param {string} props.name - Название иконки.
 * @param {string} props.className - CSS классы.
 */
export const Icon = ({ name, className }) => {
  const icons = {
    "chevron-down": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="16"
        height="16"
        viewBox="0 0 32 32"
        style={{ enableBackground: "new 0 0 32 32" }}
        xmlSpace="preserve"
        className={className}
      >
        <polygon points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 " />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    close: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 32 32"
        className={className}
      >
        <polygon points="24 9.4 22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4" />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    star: (
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={className}
      >
        <path d="M16,6.52l2.76,5.58.46,1,1,.15,6.16.89L22,18.44l-.75.73.18,1,1.05,6.13-5.51-2.89L16,23l-.93.49L9.56,26.34l1-6.13.18-1L10,18.44,5.58,14.09l6.16-.89,1-.15.46-1L16,6.52M16,2l-4.55,9.22L1.28,12.69l7.36,7.18L6.9,30,16,25.22,25.1,30,23.36,19.87l7.36-7.17L20.55,11.22Z" />
        <rect className="fill-none" />
      </svg>
    ),
    favorite: (
      <svg
        className={className}
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
      </svg>
    ),
    "chevron-left": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        style={{ enableBackground: "new 0 0 32 32" }}
        xmlSpace="preserve"
        className={className}
        width="16"
        height="16"
      >
        <polygon points="10,16 20,6 21.4,7.4 12.8,16 21.4,24.6 20,26 " />
        <rect id="_x3C_Transparent_Rectangle_x3E_" className="fill-none" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={className}
      >
        <polygon points="17 22 17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22" />
        <path d="M16,8a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,8Z" />
        <path d="M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z" />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    "checkmark-outline": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={className}
      >
        <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className={className}
      >
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={className}
      >
        <g>
          <path
            d="M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"
            transform="translate(0)"
          />
        </g>
        <g>
          <rect className="fill-none" width="32" height="32" />
        </g>
      </svg>
    ),
    favorites: (
      <svg
        fill="currentColor"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={className}
      >
        <path d="M16,2a9,9,0,0,0-6,15.69V30l6-4,6,4V17.69A9,9,0,0,0,16,2Zm4,24.26-2.89-1.92L16,23.6l-1.11.74L12,26.26V19.05a8.88,8.88,0,0,0,8,0ZM20.89,16A7,7,0,1,1,23,11,7,7,0,0,1,20.89,16Z" />
        <rect className="fill-none" width="32" height="32" />
      </svg>
    ),
    basket:  (
      <svg
        fill="currentColor"
        width="24"
        height="24"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={className}
      >
        <path d="M17 24H21V28H17zM24 24H28V28H24zM17 17H21V21H17zM24 17H28V21H24z"></path>
        <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2	H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
      </svg>
    ),
    "chevron-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        style={{ enableBackground: "new 0 0 32 32" }}
        xmlSpace="preserve"
        className={className}
        width="16"
        height="16"
      >
        <polygon points="22,16 12,6 10.6,7.4 19.2,16 10.6,24.6 12,26 " />
        <rect id="_x3C_Transparent_Rectangle_x3E_" className="fill-none" />
      </svg>
    ),
    "minus": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M5 12h14"></path>
      </svg>
    ),
    "plus": (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
    )
  };

  return icons[name] || null;
};
