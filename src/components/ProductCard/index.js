import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { Box, Heading, Stack, Text, Flex, Button } from "@chakra-ui/react";
import { useShoppingCart } from "../../context/cart-provider";

const ProductCard = ({ product }) => {
  const { addItem } = useShoppingCart();

  const handleOnAddToCart = () => {
    addItem({
      id: product?.id,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      price: product?.price,
      stripeId: product?.stripeId,
    });
  };

  return (
    <Stack
      id="card"
      sx={{
        width: { base: "full", md: "md" },
        paddingTop: "20px",
        marginTop: "40px",
        paddingLeft: "20px",
        paddingRight: "20px",

        paddingBottom: "20px",
        backgroundColor: "white",
      }}
      flexDirection={"column"}
    >
      <Link to={`/product/${product.id}`}>
        <Box className="product-card_img">
          <img src={product?.image} />
        </Box>
      </Link>
      <Stack
        width={"100%"}
        flexDirection={"column"}
        gridRowGap={"2px"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Heading>{product?.title}</Heading>
        <Text>{product?.description}</Text>
        <Flex justifyContent={"space-between"} alignItems={"flex-end"}>
          <Button
            onClick={() => {
              handleOnAddToCart();
            }}
          >
            Add to Cart
          </Button>
          <Text fontWeight={700} fontSize={"24px"}>
            ${product?.price}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
