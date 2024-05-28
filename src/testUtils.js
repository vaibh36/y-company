/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";

import { ThemeProvider, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

export function renderWithProviders(ui) {
  const Wrapper = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
  };

  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  // Return an object with the store and all of RTL's query functions
  // return { ...render(ui, { wrapper: Wrapper }) };
  return render(ui, { wrapper: Wrapper });
}
