import React, { useEffect } from "react";
import { renderWithProviders } from "../../testUtils";
import NavbarIndex from "./index";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useShoppingCart } from "../../context/cart-provider";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MyProductProvider } from "../../context/product-provide";

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: async () => {
      return [
        {
          data: () => {
            return {
              id: "1212",
              price: 12,
              image:
                "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
              description: "12121",
              stripeId: "21212",
            };
          },
        },
        {
          data: () => {
            return {
              id: "1212",
              price: 12,
              image:
                "https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp",
              description: "12121",
              stripeId: "21212",
            };
          },
        },
      ];
    },
  };
});

test("first test case", () => {
  renderWithProviders(
    <MemoryRouter>
      <MyProductProvider>
        <NavbarIndex />
      </MyProductProvider>
    </MemoryRouter>
  );
});

test("second test case", async () => {
  renderWithProviders(
    <MemoryRouter>
      <MyProductProvider>
        <NavbarIndex />
      </MyProductProvider>
    </MemoryRouter>
  );
  const shoppingIcon = await screen.findByTestId("cart__icon");
  fireEvent.click(shoppingIcon);
});

test("second test case", async () => {
  renderWithProviders(
    <MemoryRouter>
      <MyProductProvider>
        <NavbarIndex />
      </MyProductProvider>
    </MemoryRouter>
  );
  const searchIcon = await screen.findByTestId("search__icon");
  fireEvent.click(searchIcon);
});
