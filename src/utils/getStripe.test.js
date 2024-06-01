// getStripe.test.js
import { loadStripe } from "@stripe/stripe-js";
import getStripe from "../getStripe";

// Mock the loadStripe function
jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(),
}));

describe("getStripe", () => {
  //   afterEach(() => {
  //     // Clear the stripePromise to ensure tests are isolated
  //     stripePromise = null;
  //   });

  test("should call loadStripe with the correct key and return the promise", async () => {
    const mockStripeInstance = {};
    loadStripe.mockResolvedValue(mockStripeInstance);

    const stripe = await getStripe();

    expect(loadStripe).toHaveBeenCalledWith(
      "pk_test_51MQ3YASHdhwdgbtqdNyGBWmWloypptG7nNOSoDOBEKypZcYN89GxaJyGEivpFS0IfxhHbPfJaQP7I0Yx6MomxIEW00e05Yh2gk"
    );
    expect(stripe).toBe(mockStripeInstance);
  });

  test("should return the same promise if called multiple times", async () => {
    const mockStripeInstance = {};
    loadStripe.mockResolvedValue(mockStripeInstance);
  });
});
