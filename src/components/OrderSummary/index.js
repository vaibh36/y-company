import { Stack, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useShoppingCart } from "../../context/cart-provider";
import axios from "axios";
import getStripe from "../../getStripe";

const OrderSummary = () => {
  const { cartDetails } = useShoppingCart();
  const cartItems = Object.values(cartDetails);
  console.log("cartDetails are:-", cartDetails);
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });

  const checkoutFn = async () => {
    const items = Object.keys(cartDetails)?.map((val) => {
      return {
        price: cartDetails[val]?.stripeId,
        quantity: cartDetails[val]?.quantity,
      };
    });

    const {
      data: { id },
    } = await axios.post("http://localhost:3001/api/checkout-sessions", {
      items: items,
    });
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: id,
    });
  };

  const totalPrice = React.useMemo(() => {
    return (cartItems || [])?.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  }, [JSON.stringify(cartItems)]);

  return (
    totalPrice > 0 && (
      <Stack
        flexDirection={"column"}
        width={"full"}
        gap={4}
        bgColor={"#E2E8F0"}
        p={4}
      >
        <Text fontWeight={700} fontSize={"24px"} textAlign={"center"}>
          Order Summary
        </Text>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Text fontWeight={700} fontSize={"24px"}>
            Total Products (Inc GST)
          </Text>
          <Text>INR {totalPrice}</Text>
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Text fontWeight={700} fontSize={"24px"}>
            Delivery Charges
          </Text>
          <Text>INR 0</Text>
        </Stack>
        <Stack alignItems={{ base: "center", md: "end" }}>
          <Button
            paddingLeft={{ base: "2" }}
            paddingRight={{ base: "2" }}
            onClick={checkoutFn}
            colorScheme="blue"
          >
            Checkout
          </Button>
        </Stack>
      </Stack>
    )
  );
};

export default OrderSummary;
