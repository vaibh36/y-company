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
} from "@chakra-ui/react";
import { MyProductProvider } from "../../context/product-provide";

const SearchModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginBottom={8}>Enter the search criteria</Text>
          <Stack flexDirection={"column"} gap={16}>
            <Stack flexDirection={"column"}>
              <Text fontWeight={700}>Category: </Text>
              <Select placeholder="Select Category">
                <option value="">All</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </Select>
            </Stack>
            <Stack>
              <Text fontWeight={700}>Cost: </Text>
              <Select id="cost">
                <option value="">All</option>
                <option value="low">Low (Below $50)</option>
                <option value="medium">Medium ($50 - $200)</option>
                <option value="high">High (Above $200)</option>
              </Select>
            </Stack>
            <div>
              <Input
                type="text"
                id="productName"
                placeholder="Search by product name"
              />
            </div>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
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
