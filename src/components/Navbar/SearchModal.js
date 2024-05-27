import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MyContext } from "../../context/product-provide";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SearchModal = ({ isOpen, onClose }) => {
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const { products, setSearchProducts } = React.useContext(MyContext);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (category) {
      filtered = filtered?.filter((product) => product.category === category);
    }
    if (cost) {
      filtered = filtered?.filter((product) => {
        if (cost === "low") return product.price < 300;
        if (cost === "medium")
          return product.price > 300 && product.price <= 700;
        if (cost === "high") return product.price > 700;
        return true;
      });
    }

    if (searchInput) {
      filtered = filtered?.filter((product) => {
        if (product?.title?.includes(searchInput)) {
          return product;
        }
      });
    }

    onClose();
    setSearchProducts(filtered);
    navigate("/searched-products");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobileView ? "xs" : "lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginBottom={8}>Enter the search criteria</Text>
          <Stack flexDirection={"column"} gap={16}>
            <Stack flexDirection={"column"}>
              <Text fontWeight={700}>Category: </Text>
              <Select
                placeholder="Select Category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="mens clothing">Men's Clothing</option>
                <option value="womens clothing">Women's Clothing</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Electronics">Electronics</option>
              </Select>
            </Stack>
            <Stack>
              <Text fontWeight={700}>Cost: </Text>
              <Select
                placeholder="Select Cost"
                value={cost}
                onChange={handleCostChange}
              >
                <option value="low">Low(Below INR 300)</option>
                <option value="medium">Medium(INR 301 - INR 700)</option>
                <option value="high">High(Above INR 701)</option>
              </Select>
            </Stack>
            <div>
              <Input
                type="text"
                id="productName"
                placeholder="Search by product name"
                onChange={(event) => {
                  setSearchInput(event?.target?.value);
                }}
              />
            </div>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={filterProducts}>
            Search
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            variant={"outline"}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;

SearchModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
