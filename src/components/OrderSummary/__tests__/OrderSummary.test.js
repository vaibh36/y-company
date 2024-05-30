import React, { useEffect } from "react";
import { renderWithProviders } from "../../../testUtils";
import OrderSummary from "../index";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useShoppingCart } from "../../../context/cart-provider";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("../../../getStripe", () => {
  const redirectToCheckout = () => {
    expect(true).toBeTruthy();
    return true;
  };
  const getStripe = async () => {
    expect(true).toBeTruthy();
    return { redirectToCheckout };
  };
  return getStripe;
});

const AddToCart = ({ product }) => {
  const { addItem } = useShoppingCart();
  useEffect(() => {
    addItem(product);
  }, [product]);

  return <>Adding product</>;
};

const product = {
  id: "1212",
  price: 12,
  image: "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
  description: "12121",
  stripeId: "21212",
};

test("render test case", async () => {
  var mock = new MockAdapter(axios);
  mock
    .onPost("https://ycompany-be.vercel.app/api/checkout-sessions")
    .reply(200, {
      id: 132121,
    });

  renderWithProviders(
    <MemoryRouter>
      <AddToCart product={product} />
      <OrderSummary />
    </MemoryRouter>
  );

  const orderSummary = await screen.findByTestId("order__summary");
  expect(orderSummary).toBeInTheDocument();
  expect(screen.getByTestId("order__summary__total")).toBeInTheDocument();
  expect(screen.getByTestId("order__summary__total")).toHaveTextContent(
    `INR ${product.price}`
  );
  expect(screen.getByTestId("order__summary__checkout")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("order__summary__checkout"));
  expect.assertions(6);
});
