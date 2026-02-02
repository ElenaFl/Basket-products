import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import { EmptyPage } from "../pages/EmptyPage";
import { BasketList } from "../pages/BasketList";
import { Admin } from "../pages/Admin";

/** Массив роутов приложения */
const ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/products/:id", element: <ProductDetails /> },
  { path: "/empty", element: <EmptyPage /> },
  { path: "/basket", element: <BasketList /> },
  { path: "/admin", element: <Admin /> },
];

/**
 * Рекурсивно отображает роуты и дочерние роуты.
 * @param {RouteItem} route - Объект роута.
 */
const renderRoute = ({ path, element, children }) => (
  <Route key={path} path={path} element={element}>
    {children && children.map(renderRoute)}
  </Route>
);

/** Корневой компонент приложения с роутами */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {ROUTES.map(renderRoute)}
    </Route>
  </Routes>
);
