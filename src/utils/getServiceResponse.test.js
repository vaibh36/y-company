// getServiceResponse.test.js
import getServiceResponse from "./getServiceResponse";

// Mock the fetch function
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test("fetches data from the correct URL and returns the response", async () => {
  const mockData = { id: 1, name: "Test Product" };
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockData,
  });

  const path = "products/1";
  const data = await getServiceResponse(path);

  expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/1");
  expect(data).toEqual(mockData);
});

test("handles fetch errors", async () => {
  fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

  const path = "products/1";

  await expect(getServiceResponse(path)).rejects.toThrow("Failed to fetch");
});
