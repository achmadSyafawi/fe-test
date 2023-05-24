import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./views/ProductList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
