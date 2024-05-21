import { Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../context/product-provide";
import {
  Box,
  Container,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";

const Category = () => {
  const { id } = useParams();
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  const { products } = React.useContext(MyContext);
  const [categoryItems, setCategoryItems] = React.useState([]);

  React.useEffect(() => {
    if (id && products?.length > 0) {
      let filtered = [...products];

      filtered = filtered?.filter((product) => {
        return product?.category?.substring(0, 4) === id?.substring(0, 4);
      });

      setCategoryItems([...filtered]);
    }
  }, [id, JSON.stringify(products)]);

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
            {categoryItems?.map((item, index) => {
              return <ProductCard product={item} key={index} />;
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Category;
