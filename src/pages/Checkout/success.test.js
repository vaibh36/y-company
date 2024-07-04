import React from "react";
import { renderWithProviders } from "../../testUtils";
import SuccessPage from "./success";
import { MemoryRouter } from "react-router-dom";
import { MyProductProvider } from "../../context/product-provide";
import axios from "axios";

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
      ];
    },
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

test("basic test case", () => {
  const useSearchParamsMock = require("react-router-dom").useSearchParams;
  useSearchParamsMock.mockReturnValue([
    new URLSearchParams("sessionId=testCode"),
  ]);
  renderWithProviders(
    <MemoryRouter>
      <MyProductProvider>
        <SuccessPage />
      </MyProductProvider>
    </MemoryRouter>
  );
});
