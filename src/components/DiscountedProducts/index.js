import React from "react";
import { MyContext } from "../../context/product-provide";
import {
  Box,
  Container,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductCard from "../ProductCard";

const DiscountedProducts = () => {
  const { products } = React.useContext(MyContext);

  return (
    <Box marginTop={0} id="new__box" width={"full"}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} width={"100%"} gap={3}>
        {products?.slice(0, 2).map((item, index) => {
          if (item?.discount) return <ProductCard product={item} key={index} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default DiscountedProducts;
