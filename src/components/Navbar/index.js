import React from "react";
import { Box, Stack, Text, OrderedList, chakra, Flex } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useShoppingCart } from "../../context/cart-provider";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const { cartCount } = useShoppingCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <Stack
      flexDirection={"row"}
      sx={{
        width: "100%",
      }}
      justifyContent={"space-between"}
      id="nav__bar"
      padding="4"
    >
      <Stack>
        <chakra.span
          className="brand-name"
          sx={{
            color: "black",
            fontWeight: "600",
          }}
        >
          <Link to="/">Y Company</Link>
        </chakra.span>
      </Stack>
      <Stack
        className="nav-link_container"
        flexDirection={"row"}
        sx={{
          gap: "40px",
        }}
      >
        <OrderedList
          sx={{
            color: "black",
            fontWeight: "600",
          }}
        >
          <NavLink to="/">Home</NavLink>
        </OrderedList>
        <OrderedList
          sx={{
            color: "black",
            fontWeight: "600",
          }}
        >
          <NavLink to="/explore/men">Men</NavLink>
        </OrderedList>
        <OrderedList
          sx={{
            color: "black",
            fontWeight: "600",
          }}
        >
          <NavLink to="/explore/women">Women</NavLink>
        </OrderedList>
        <OrderedList
          sx={{
            color: "black",
            fontWeight: "600",
          }}
        >
          <NavLink to="/all">Explore All</NavLink>
        </OrderedList>
        <Flex>
          <ShoppingCart
            size={22}
            cursor={"pointer"}
            onClick={() => {
              navigate("/checkout");
            }}
          />
          <Text
            color="black"
            fontSize="sm"
            position={"absolute"}
            marginLeft={5}
          >
            {cartCount}
          </Text>
        </Flex>
      </Stack>

      <SearchIcon
        color={"black"}
        boxSize={6}
        onClick={() => {
          onOpen();
        }}
      />
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Navbar;
