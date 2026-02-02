import React from 'react'
import { AppRoutes } from './components/routes/AppRoutes'
import { CartProvider } from './components/context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  ) 
}

export default App
