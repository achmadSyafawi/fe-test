import React from "react";
import {
  getAllByAltText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import ProductList from "./views/ProductList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const queryClient = new QueryClient();

test("render Product list page search input", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
  expect(screen.getByText("Loading. . .")).toBeVisible();
  const inputSearch = screen.getByTestId("input-search");
  expect(inputSearch).toBeInTheDocument();
});
