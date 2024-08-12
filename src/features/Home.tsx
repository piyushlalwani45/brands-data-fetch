import { Box } from "@chakra-ui/react";
import { GetAllProducts, GetProductByBrand } from "../services/GetProducts";
import BrandsList from "../components/BrandsList";
import { useBrandsAtom } from "../atoms/BrandsAtom";
import { useState, useEffect } from "react";
import { GetProductType } from "../Types/GetProductType";

const Home = () => {
  const { selectedBrands } = useBrandsAtom();
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState<
    GetProductType[]
  >([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isDataError, setIsDataError] = useState<boolean>(false);

  const {
    data: allProductsData,
    isLoading: allProductsIsLoading,
    isError,
  } = GetAllProducts();
  const queryResults = GetProductByBrand(selectedBrands);
  useEffect(() => {
    if (selectedBrands.length === 0) {
      setIsDataLoading(allProductsIsLoading);
      setIsDataError(isError);
      if (allProductsData) setProductsToBeDisplayed(allProductsData);
    } else {
      // Fetch products by selected brands
      const isLoading = queryResults.some((result) => result.isLoading);
      setIsDataLoading(isLoading);
      const isError = queryResults.some((result) => result.isError);
      setIsDataError(isError);
      const allProducts = queryResults.flatMap((result) => result.data || []);
      console.log(allProducts, "selected products");

      setProductsToBeDisplayed(allProducts);
    }
  }, [selectedBrands, allProductsData, queryResults]);

  // if (isDataLoading) return <div>Loading...</div>;
  // if (isDataError) return <div>Error loading products</div>;

  return (
    <Box width="w-screen">
      {productsToBeDisplayed.map((data) => (
        <div key={data.id}>{data.name}</div>
      ))}
      <BrandsList />
    </Box>
  );
};

export default Home;
