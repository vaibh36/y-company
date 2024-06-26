import {
  Text,
  Heading,
  Container,
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import { Box } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import MobileNavbar from "../../components/MobileNavbar";
import DiscountedProducts from "../../components/DiscountedProducts";

const Home = () => {
  const navigate = useNavigate();

  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  return (
    <Box
      id="home__page"
      sx={{
        background: "#eee",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}
        <Flex flexDirection={"row"}>
          <Container maxWidth={"6xl"} marginTop={20}>
            <Heading>
              Experience the height of fashion with our exquisite designer
              pieces.
            </Heading>
            <Text>
              Where style, sophistication, exclusivity is the forefront of our
              collection. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Repellat quaerat nostrum quia nam earum, libero, expedita
              impedit delectus provident quo eveniet.
            </Text>
            <Button
              colorScheme="blue"
              mr={3}
              marginTop={10}
              onClick={() => {
                navigate("all");
              }}
            >
              Discover our products
            </Button>
          </Container>
          {!isMobileView && (
            <Flex marginTop={20}>
              <Stack flexDirection={"column"} gridRowGap={4}>
                <img
                  src="https://ace-clothing.netlify.app/assets/home-photo-1-257jNod0.webp"
                  alt="Description of the image"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
                <img
                  src="https://ace-clothing.netlify.app/assets/home-photo-2--o4d97Ez.webp"
                  alt="Description of the image"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "20px",
                  }}
                />
              </Stack>
            </Flex>
          )}
        </Flex>
        {process.env.REACT_APP_OFFERS === "true" && (
          <Flex flexDirection={"column"} marginTop={8} padding={"16px"}>
            <Flex
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                a: {
                  color: "blue",
                  textDecoration: "underline",
                },
              }}
            >
              <Heading>Explore Items with great offers</Heading>
              <Link to="/offers">View</Link>
            </Flex>
            <DiscountedProducts />
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default Home;
