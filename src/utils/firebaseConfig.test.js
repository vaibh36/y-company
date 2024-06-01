// firebaseConfig.test.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));

describe("Firebase Initialization", () => {
  test("should initialize Firebase app with the correct config", () => {
    const firebaseConfig = {
      apiKey: "AIzaSyD-DQ4FB-kL5kEBSCzs4QpTI_t_Tr9YiMA",
      authDomain: "flora-3e4ba.firebaseapp.com",
      databaseURL: "https://flora-3e4ba-default-rtdb.firebaseio.com",
      projectId: "flora-3e4ba",
      storageBucket: "flora-3e4ba.appspot.com",
      messagingSenderId: "826796194369",
      appId: "1:826796194369:web:bbb2a6e731c518ec1f64c0",
      measurementId: "G-NK64JRC44E",
    };

    require("../firebaseConfig");

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });

  test("should get analytics for the initialized app", () => {
    const mockApp = {};
    initializeApp.mockReturnValue(mockApp);

    require("../firebaseConfig");
  });
});
