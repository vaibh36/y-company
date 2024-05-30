import React from "react";
import { renderWithProviders } from "../../../testUtils";
import ProductView from "../index";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { cartState } from "../../../context/cart-provider";

test("render test case", async () => {
  renderWithProviders(
    <MemoryRouter>
      <ProductView />
    </MemoryRouter>
  );

  await screen.findByTestId("product__view");
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
      <ProductView productData={product} />
    </MemoryRouter>
  );

  expect(cartState).toMatchObject({
    cartDetails: {},
    cartCount: 0,
    totalPrice: 0,
  });
  const addBtn = await screen.findByTestId("add__to__cart");
  fireEvent.click(addBtn);
  expect(cartState).toMatchObject({
    cartDetails: {
      [product.id]: {
        ...product,
        quantity: 1,
      },
    },
    cartCount: 1,
    totalPrice: 0,
  });
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
      <ProductView productData={product} />
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
      <ProductView productData={product} />
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
      <ProductView productData={product} />
    </MemoryRouter>
  );

  const productPrice = await screen.findByTestId("product__price");
  expect(productPrice).toBeInTheDocument();
});
