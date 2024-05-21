import { Text } from "@chakra-ui/react";
import React from "react";
import ProductView from "../../components/ProductView";
import { useParams } from "react-router-dom";
import getServiceResponse from "../../utils/getServiceResponse";

const ProductDetail = () => {
  const [productData, setProductData] = React.useState({});
  const { id } = useParams();
  React.useEffect(() => {
    async function getData() {
      let data = await getServiceResponse(`products/${id}`);
      setProductData(data);
    }
    getData();
  }, [id]);

  return <ProductView productData={productData} />;
};

export default ProductDetail;
