import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../ui/Header/Header";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20 pb-20">
        <Outlet />
      </main>
    </div>
  );
};