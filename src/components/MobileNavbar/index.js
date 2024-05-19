import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { Text, Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ShoppingCart } from "phosphor-react";
import { useShoppingCart } from "../../context/cart-provider";
import { useNavigate } from "react-router-dom";

const MobileNavbar = () => {
  const { cartCount } = useShoppingCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        position={"fixed"}
        id="icon"
        zIndex={"modal"}
        w="full"
        bgColor={"black"}
        p={4}
        paddingLeft={isOpen ? 0 : 4}
      >
        <Flex>
          {!isOpen && (
            <Flex flex={1}>
              <HamburgerIcon
                color={"white"}
                boxSize={6}
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              />
            </Flex>
          )}
          {isOpen && (
            <Box
              w="full"
              as="nav"
              position={"fixed"}
              overflow="hidden"
              zIndex={"modal"}
              bgColor="black"
              h={isOpen ? "80%" : "0px"}
              p="0"
              paddingLeft={4}
              display={"flex"}
              flexDirection="column"
            >
              <CloseIcon
                color="white"
                boxSize={5}
                onClick={() => {
                  isOpen ? onClose() : onOpen();
                }}
              />
            </Box>
          )}
          <Flex flex={2}>
            <Text color="white">Y Company</Text>
          </Flex>
          <Flex>
            <ShoppingCart
              color="white"
              size={22}
              onClick={() => {
                navigate("/checkout");
              }}
            />
            <Text
              color="white"
              fontSize="sm"
              position={"absolute"}
              marginLeft={5}
            >
              {cartCount}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default MobileNavbar;