import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./views/ProductList";

function App() {
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Movies
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <ProductList />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
