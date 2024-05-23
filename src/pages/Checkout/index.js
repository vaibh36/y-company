import {
  Text,
  useBreakpointValue,
  Box,
  Container,
  Flex,
  Grid,
  Divider,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";
import { useShoppingCart } from "../../context/cart-provider";
import { Plus, Minus } from "phosphor-react";
import OrderSummary from "../../components/OrderSummary";

const Checkout = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  const { cartCount, cartDetails, addItem, removeItem } = useShoppingCart();
  const cartItems = Object.values(cartDetails);

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  const handleOnAddToCart = (productData) => {
    addItem({
      id: productData?.id,
      price: productData?.price,
      image: productData?.image,
      description: productData?.description,
      price: productData?.price,
      stripeId: productData?.stripeId,
    });
    toast({
      title: "Item Added",
      description: "Item added in the cart",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    close();
  };

  return (
    <Box minHeight={"100vh"}>
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}
        <Flex padding={"32px"} flexDirection={"column"}>
          <Text mb={4} fontWeight={600} mt={{ base: 8 }}>
            {cartCount} Items Selected
          </Text>
          {Object.entries(cartDetails)?.length > 0 &&
            (cartItems || [])?.map((item, index) => {
              return (
                <Grid
                  templateColumns={
                    !isMobileView ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
                  }
                  gap={2}
                  mb={16}
                  key={index}
                >
                  <Flex flexDirection={"row"} alignItems={"center"} gap={8}>
                    <img
                      src={item?.image}
                      alt="Description of the image"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "20px",
                      }}
                    />
                    <Flex flexDirection={"column"} gap={3}>
                      <Text fontWeight={"bold"}>
                        {item?.description?.slice(0, 60) + "..."}
                      </Text>
                      <Text fontWeight={600}>Offer Price:-{item?.price}</Text>
                      {isMobileView && (
                        <Flex
                          flexDirection={"column"}
                          alignItems={"center"}
                          mb={16}
                        >
                          <Text mb={4}>QTY:</Text>
                          <HStack spacing={4}>
                            <Flex
                              bgColor={"gray"}
                              alignItems={"center"}
                              gridColumnGap={2}
                            >
                              <Plus
                                cursor={"pointer"}
                                onClick={() => {
                                  handleOnAddToCart(item);
                                }}
                                ps={2}
                              />
                              <Text fontWeight={"bold"} px={6}>
                                {item?.quantity}
                              </Text>
                              <Minus
                                cursor={"pointer"}
                                onClick={() => {
                                  removeItem(item);
                                  toast({
                                    title: "Item Removed",
                                    description: "Item removed from the cart",
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                  });
                                }}
                                pe={2}
                              />
                            </Flex>
                          </HStack>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  {!isMobileView && (
                    <Flex justifyContent={"center"}>
                      {" "}
                      <Divider
                        orientation="vertical"
                        borderColor="gray"
                        height={"150px"}
                      />
                    </Flex>
                  )}

                  {!isMobileView && (
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                      mb={16}
                    >
                      <Text mb={4}>QTY:</Text>
                      <HStack spacing={4}>
                        <Flex
                          bgColor={"gray"}
                          alignItems={"center"}
                          gridColumnGap={2}
                        >
                          <Plus
                            cursor={"pointer"}
                            onClick={() => {
                              handleOnAddToCart(item);
                            }}
                            ps={2}
                          />
                          <Text fontWeight={"bold"} px={6}>
                            {item?.quantity}
                          </Text>
                          <Minus
                            cursor={"pointer"}
                            onClick={() => {
                              removeItem(item);
                              toast({
                                title: "Item Removed",
                                description: "Item removed from the cart",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                              });
                            }}
                            pe={2}
                          />
                        </Flex>
                      </HStack>
                    </Flex>
                  )}
                </Grid>
              );
            })}
        </Flex>
        <OrderSummary />
      </Container>
    </Box>
  );
};

export default Checkout;
