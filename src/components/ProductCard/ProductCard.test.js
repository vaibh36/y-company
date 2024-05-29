import React from "react";
import { renderWithProviders } from "../../testUtils";
import ProductCard from "./index";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../context/cart-provider", () => ({
  useShoppingCart: () => ({
    addItem: jest.fn(),
  }),
}));

test("render test case", async () => {
  renderWithProviders(
    <MemoryRouter>
      <ProductCard />
    </MemoryRouter>
  );

  await screen.findByTestId("product__card");
});

test("click add to cart test case", async () => {
  const product = {
    id: "1212",
    price: 12,
    image: "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
    description: "12121",
    stripeId: "21212",
  };

  renderWithProviders(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  const addBtn = await screen.findByTestId("add__to__cart");
  fireEvent.click(addBtn);
});

test("product title availability", async () => {
  const product = {
    id: "1212",
    price: 12,
    image: "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
    description: "12121",
    stripeId: "21212",
  };

  renderWithProviders(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  const productTitle = await screen.findByTestId("product__title");
  expect(productTitle).toBeInTheDocument();
});

test("product description availability", async () => {
  const product = {
    id: "1212",
    price: 12,
    image: "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
    description: "12121",
    stripeId: "21212",
  };

  renderWithProviders(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  const productDesc = await screen.findByTestId("product__description");
  expect(productDesc).toBeInTheDocument();
});

test("product price availability", async () => {
  const product = {
    id: "1212",
    price: 12,
    image: "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
    description: "12121",
    stripeId: "21212",
  };

  renderWithProviders(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );

  const productPrice = await screen.findByTestId("product__price");
  expect(productPrice).toBeInTheDocument();
});

test("should access environment variable", () => {
  expect(process.env.REACT_APP_OFFERS).toBe("false");
});
