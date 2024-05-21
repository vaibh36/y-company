import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
import { Text, Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ShoppingCart } from "phosphor-react";
import { useShoppingCart } from "../../context/cart-provider";
import { useNavigate } from "react-router-dom";
import SearchModal from "../Navbar/SearchModal";

const MobileNavbar = () => {
  const { cartCount } = useShoppingCart();
  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose,
  } = useDisclosure();
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
              <Flex
                sx={{
                  marginTop: 8,
                }}
                gap={"2px"}
                flexDirection={"column"}
              >
                <Text
                  color="white"
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                >
                  Home
                </Text>
                <Text
                  color="white"
                  onClick={() => {
                    navigate("/category/mens-clothing");
                    onClose();
                  }}
                >
                  Men
                </Text>
                <Text
                  color="white"
                  onClick={() => {
                    navigate("/category/womens-clothing");
                    onClose();
                  }}
                >
                  Women
                </Text>
                <Text
                  color="white"
                  onClick={() => {
                    navigate("/category/jewelery");
                    onClose();
                  }}
                >
                  Jewelery
                </Text>
                <Text
                  color="white"
                  onClick={() => {
                    navigate("/category/electronics");
                    onClose();
                  }}
                >
                  Electronics
                </Text>
              </Flex>
            </Box>
          )}
          <Flex flex={2}>
            <Text color="white">Y Company</Text>
          </Flex>
          <Flex flexDirection={"row"} gap={4} alignItems={"center"}>
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
            <SearchIcon
              color={"white"}
              cursor={"pointer"}
              boxSize={4}
              onClick={() => {
                onSearchModalOpen();
              }}
            />
          </Flex>
        </Flex>
      </Box>
      <SearchModal isOpen={isSearchModalOpen} onClose={onSearchModalClose} />
    </Box>
  );
};

export default MobileNavbar;
