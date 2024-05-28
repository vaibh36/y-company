import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useShoppingCart } from "../../context/cart-provider";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { addItem } = useShoppingCart();
  const toast = useToast();
  const [isRed, setIsRed] = React.useState(true);
  const offers = process.env.REACT_APP_OFFERS;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsRed((prevIsRed) => !prevIsRed);
    }, 1000); // Toggle color every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleOnAddToCart = () => {
    addItem({
      id: product?.id,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      price: product?.price,
      stripeId: product?.stripeId,
    });
    toast({
      title: "Item Added",
      description: "Item added in the cart",
      status: "success",
      duration: 9000,
      isClosable: true,
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
      position={"relative"}
    >
      {product?.discount && offers === "true" && (
        <Box
          position="absolute"
          top="10px"
          right="10px"
          backgroundColor={isRed ? "red" : "green"}
          color="white"
          padding="5px 10px"
          borderRadius="5px"
          fontWeight="bold"
          marginTop={"16px"}
          transform={"rotate(20deg)"}
        >
          Discount
        </Box>
      )}
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
            colorScheme="blue"
            mr={3}
            onClick={() => {
              handleOnAddToCart();
            }}
          >
            Add to Cart
          </Button>
          <Text fontWeight={700} fontSize={"24px"}>
            INR {product?.price}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    stripeId: PropTypes.string,
  }),
};
