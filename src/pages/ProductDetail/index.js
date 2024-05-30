import { Box, Container, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import ProductView from "../../components/ProductView";
import { useParams } from "react-router-dom";
import getServiceResponse from "../../utils/getServiceResponse";
import Navbar from "../../components/Navbar";
import MobileNavbar from "../../components/MobileNavbar";

const ProductDetail = () => {
  const isMobileView = useBreakpointValue({ base: true, md: false, lg: false });
  const [productData, setProductData] = React.useState({});
  const { id } = useParams();
  React.useEffect(() => {
    async function getData() {
      let data = await getServiceResponse(`products/${id}`);
      setProductData(data);
    }
    getData();
  }, [id]);

  return (
    <Box
      sx={{
        background: "#eee",
      }}
    >
      <Container maxWidth={"6xl"} p={0}>
        {!isMobileView ? <Navbar /> : <MobileNavbar />}
        <ProductView productData={productData} />
      </Container>
    </Box>
  );
};

export default ProductDetail;
