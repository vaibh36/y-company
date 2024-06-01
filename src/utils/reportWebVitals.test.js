// reportWebVitals.test.js
import reportWebVitals from "../reportWebVitals";

// Mock the web-vitals module
jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe("reportWebVitals", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("does not call web-vitals functions if callback is not a function", async () => {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require("web-vitals");

    reportWebVitals(null);

    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});
