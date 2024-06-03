import React from "react";
import { renderWithProviders } from "../../testUtils";
import DiscountCom from "./index";
import { MemoryRouter } from "react-router-dom";
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
      ];
    },
  };
});

test("basic test case", () => {
  renderWithProviders(
    <MemoryRouter>
      <MyProductProvider>
        <DiscountCom />
      </MyProductProvider>
    </MemoryRouter>
  );
});
