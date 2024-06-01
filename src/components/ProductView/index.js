import React from "react";
import "./ProductView.css";
import isEmpty from "lodash.isempty";
import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useShoppingCart } from "../../context/cart-provider";
import PropTypes from "prop-types";

const ProductView = ({ productData }) => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  const { addItem, cart } = useShoppingCart();

  const handleOnAddToCart = () => {
    addItem({
      id: productData?.id,
      price: productData?.price,
      image: productData?.image,
      description: productData?.description,
      stripeId: productData?.stripeId,
    });
  };
  return (
    <Box data-testid="product__view">
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
        <Box className="product-img_wrapper" marginTop={"80px"} width={"full"}>
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
          <Heading data-testid="product__title">{productData?.title}</Heading>
          {!isEmpty(productData) && (
            <Text fontSize={"32px"} data-testid="product__price">
              ${productData?.price}
            </Text>
          )}
          <Text
            color="#666"
            fontSize={"24px"}
            data-testid="product__description"
          >
            {productData?.description}
          </Text>

          {!isEmpty(productData) && (
            <Button
              className="product-cart_btn"
              onClick={() => {
                handleOnAddToCart();
              }}
              data-testid="add__to__cart"
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductView;

ProductView.propTypes = {
  productData: PropTypes.shape({
    price: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    stripeId: PropTypes.string,
  }),
};
