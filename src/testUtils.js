/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { CartProvider } from "../src/context/cart-provider";

export function renderWithProviders(ui) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  const Wrapper = ({ children }) => {
    return (
      <ChakraProvider theme={theme}>
        <CartProvider>{children}</CartProvider>
      </ChakraProvider>
    );
  };

  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  // Return an object with the store and all of RTL's query functions
  // return { ...render(ui, { wrapper: Wrapper }) };
  return render(ui, { wrapper: Wrapper });
}
