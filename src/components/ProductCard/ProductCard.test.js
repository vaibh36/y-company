import React from "react";
import { ThemeProvider } from "@chakra-ui/react";
import { renderWithProviders } from "../../testUtils";
import ProductCard from "./index";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../context/cart-provider", () => ({
  useShoppingCart: () => ({
    addItem: jest.fn(),
  }),
}));

test("first", async () => {
  renderWithProviders(
    <MemoryRouter>
      <ProductCard />
    </MemoryRouter>
  );
  screen.debug();
  const parent = await screen.findByTestId("product__card");
});
