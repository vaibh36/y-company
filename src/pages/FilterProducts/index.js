import React from "react";
import ProductCard from "../../components/ProductCard";

import {
  Box,
  Container,
  useBreakpointValue,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";
import "../../firebaseConfig";
import { MyContext } from "../../context/product-provide";

const ProductPage = () => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });

  const { searchedProducts } = React.useContext(MyContext);

  if (searchedProducts?.length === 0) {
    return (
      <Box
        id="product__page"
        sx={{
          background: "#eee",
        }}
      >
        <Container maxWidth={"6xl"} p={0}>
          {!isMobileView ? <Navbar /> : <MobileNavbar />}
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100vh",
            }}
          >
            <Text fontWeight={700} fontSize={"32px"}>
              {" "}
              No Products Found
            </Text>
          </Stack>
        </Container>
      </Box>
    );
  }
  return (
    <Box
      id="product__page"
      sx={{
        background: "#eee",
      }}
    >
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}

        <Box marginTop={0} id="new__box" width={"full"} minHeight={"100vh"}>
          <SimpleGrid columns={{ sm: 1, md: 2 }} width={"100%"} gap={3}>
            {searchedProducts?.map((item, index) => {
              return <ProductCard product={item} key={index} />;
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
