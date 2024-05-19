import React from "react";
import "./ProductView.css";
import isEmpty from "lodash.isempty";
import {
  Box,
  Container,
  Button,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../Navbar";
import MobileNavbar from "../MobileNavbar";
import { useShoppingCart } from "../../context/cart-provider";

const ProductView = ({ productData }) => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  const { addItem, cart } = useShoppingCart();
  const [itemInfo, setItemInfo] = React.useState({});
  console.log("cart info here is:-", cart, productData);

  const handleOnAddToCart = () => {
    addItem({
      id: productData?.id,
      price: productData?.price,
      image: productData?.image,
      description: productData?.description,
      price: productData?.price,
    });
  };
  return (
    <Box
      sx={{
        background: "#eee",
      }}
    >
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}
        <Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
              minHeight: "calc(100vh - 70px)",
              "--image-wrapper-width": isMobileView ? "80%" : "55%",
              flexDirection: { base: "column", md: "row" },
              padding: 4,
            }}
          >
            <Box
              className="product-img_wrapper"
              marginTop={"80px"}
              width={"full"}
            >
              <img src={productData?.image} />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: " 10px",
                flexDirection: "column",
                width: "100%",
                paddingTop: "40px",
              }}
            >
              <Heading>{productData?.title}</Heading>
              {!isEmpty(productData) && (
                <Text fontSize={"32px"}>${productData?.price}</Text>
              )}
              <Text color="#666" fontSize={"24px"}>
                {productData?.description}
              </Text>

              {!isEmpty(productData) && (
                <Button
                  className="product-cart_btn"
                  onClick={() => {
                    handleOnAddToCart();
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductView;
