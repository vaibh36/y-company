import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MQ3YASHdhwdgbtqdNyGBWmWloypptG7nNOSoDOBEKypZcYN89GxaJyGEivpFS0IfxhHbPfJaQP7I0Yx6MomxIEW00e05Yh2gk"
    );
  }
  return stripePromise;
};

export default getStripe;
