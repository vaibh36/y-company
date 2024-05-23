import React from "react";
import {
  Text,
  useBreakpointValue,
  Heading,
  Container,
  Flex,
  Divider,
  Box,
  chakra,
} from "@chakra-ui/react";
import { useShoppingCart } from "../../context/cart-provider";
import Header from "../../components/Navbar";
import MobileDrawer from "../../components/MobileNavbar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const { clearCart } = useShoppingCart();
  const isMobileView = useBreakpointValue({ base: true, md: false });
  const [searchParams] = useSearchParams();
  const purchaseId = searchParams.get("sessionId"); // "testCode"
  const [apidata, setApiData] = React.useState();
  //   const purchaseId = "";
  const [error, setError] = React.useState();

  React.useEffect(() => {
    if (purchaseId) {
      const data = axios
        .get(
          `https://ycompany-be.vercel.app/api/session/info?purchaseId=${purchaseId}`
        )
        .then((data) => {
          setApiData(data?.data);
        })
        .catch((e) => {
          setError(true);
        });
    }
  }, [purchaseId]);

  const isLoading = !apidata && !error;

  React.useEffect(() => {
    clearCart();
  }, []);

  React.useEffect(() => {
    if (apidata?.message === "invalid session Id") {
      setError(true);
    } else setError(false);
  }, [apidata]);

  return (
    <Box minHeight={"100vh"}>
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView && <Header />}
        {isMobileView && <MobileDrawer />}

        <head>
          <title>Order Success</title>
        </head>
        <Flex padding={"32px"} flexDirection={"column"}>
          {!error && !isLoading && (
            <>
              <Heading
                mb="2"
                textAlign={"center"}
                mt={{ base: "60px", md: 0, lg: 0 }}
              >
                PAYMENT SUCCESSFUL
              </Heading>
              <Divider orientation="horizontal" borderColor={"black"} />
              <Box mt="10">
                <Flex justifyContent={"space-between"} px="10">
                  <Text fontWeight={"bold"}>Payment Type</Text>
                  <Text fontWeight={"bold"}>Card</Text>
                </Flex>
                <Flex justifyContent={"space-between"} px="10" mt="6">
                  <Text fontWeight={"bold"}>Mobile</Text>
                  <Text fontWeight={"bold"}>
                    {apidata?.customer_details?.phone}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"} px="10" mt="6">
                  <Text fontWeight={"bold"}>Email</Text>
                  <Text fontWeight={"bold"}>
                    {apidata?.customer_details?.email}
                  </Text>
                </Flex>
                {apidata?.amount_total && (
                  <Flex justifyContent={"space-between"} px="10" mt="6">
                    <Text fontWeight={"bold"}>Amount Paid</Text>
                    <Text fontWeight={"bold"}>
                      INR {apidata?.amount_total / 100}
                    </Text>
                  </Flex>
                )}
                <Flex justifyContent={"space-between"} px="10" mt="6">
                  <Text fontWeight={"bold"}>Order Id</Text>
                  <Text fontWeight={"bold"}>{apidata?.created}</Text>
                </Flex>
              </Box>
              <Divider orientation="horizontal" borderColor={"black"} my="10" />

              <Heading mb="2" textAlign={"center"} color="orange">
                Thank you for your purchase!
              </Heading>
              <Text textAlign={"center"} fontWeight={"bold"}>
                Your order is{" "}
                <chakra.span color="orange">confirmed</chakra.span>. You will
                receive an{" "}
                <chakra.span color="orange">
                  order confirmation email/SMS
                </chakra.span>{" "}
                shortly with the expected delivery date for your items.
              </Text>
              <Text fontSize={"lg"} textAlign={"center"} mt="4">
                Please contact us for any issues at: +91 999999999
              </Text>
            </>
          )}
          {error && (
            <Heading mb="2" mt={"120px"} textAlign={"center"}>
              Please try again
            </Heading>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Success;
