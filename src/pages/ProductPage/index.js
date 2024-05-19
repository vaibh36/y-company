import React from "react";
import ProductCard from "../../components/ProductCard";
import getServiceResponse from "../../utils/getServiceResponse";
import {
  Grid,
  GridItem,
  Box,
  Container,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";
import "../../firebaseConfig";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

const ProductPage = () => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  const [apiData, setApiData] = React.useState([]);
  const db = getFirestore();

  React.useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "clothes"));
      const temporaryArr = [];
      querySnapshot.forEach((doc) => {
        temporaryArr.push(doc.data());
      });
      setApiData(temporaryArr);
    };

    fetchDataFromFirestore();
  }, []);

  console.log("storedValues are:-", apiData);

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
            {apiData?.map((item, index) => {
              return <ProductCard product={item} key={index} />;
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
