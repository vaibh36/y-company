// index.test.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));

jest.mock("../reportWebVitals", () => jest.fn());

jest.mock("../App", () => () => <div>Mocked App</div>);

describe("index.js", () => {
  it("renders the App component wrapped in ChakraProvider", () => {
    const render = jest.fn();
    ReactDOM.createRoot.mockReturnValue({ render });

    document.getElementById = jest
      .fn()
      .mockReturnValue(document.createElement("div"));

    require("../index");

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(expect.any(HTMLElement));

    expect(render).toHaveBeenCalledWith(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    );
  });

  it("calls reportWebVitals", () => {
    require("../index");
  });
});
