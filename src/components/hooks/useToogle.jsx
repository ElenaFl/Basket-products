import React, { useState } from 'react'

// Хук для переключения true/false
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  // Функция переключения
  const toggle = () => setValue(prev => !prev)
  
  return [value, toggle]
}