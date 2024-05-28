import React from "react";
import ProductCard from "../../components/ProductCard";

import {
  Box,
  Container,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";
import "../../firebaseConfig";
import { MyContext } from "../../context/product-provide";

const OffersPage = () => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  const offers = process.env.REACT_APP_OFFERS;
  const { products } = React.useContext(MyContext);

  return (
    <Box
      id="product__page"
      sx={{
        background: "#eee",
      }}
    >
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}

        <Box marginTop={0} id="new__box" width={"full"}>
          <SimpleGrid columns={{ sm: 1, md: 2 }} width={"100%"} gap={3}>
            {products?.map((item, index) => {
              if (item?.discount && offers === "true")
                return <ProductCard product={item} key={index} />;
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default OffersPage;
