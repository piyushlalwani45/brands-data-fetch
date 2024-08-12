import { useState, useEffect } from "react";
import { useBrandsAtom } from "../atoms/BrandsAtom";
import ProductCard from "../components/ProductCard";
import { GetAllProducts, GetProductByBrand } from "../services/GetProducts";
import { GetProductType } from "../Types/GetProductType";
import BrandsList from "../components/BrandsList";
import PriceRangeSlider from "../components/PriceRangeSlider";
import { usePriceAtom } from "../atoms/PriceAtom";
import { Spinner } from "@chakra-ui/react";

const Products = () => {
  const { selectedBrands } = useBrandsAtom();
  const { priceGreaterThan, priceLessThan } = usePriceAtom();
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState<
    GetProductType[]
  >([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isDataError, setIsDataError] = useState<boolean>(false);
  const {
    data: allProductsData,
    isLoading: allProductsIsLoading,
    isError,
    refetch,
    isRefetching: allDataRefetching,
  } = GetAllProducts(priceGreaterThan, priceLessThan);
  const queryResults = GetProductByBrand(
    selectedBrands,
    priceGreaterThan,
    priceLessThan,
  );

  useEffect(() => {
    if (selectedBrands.length === 0) {
      refetch();
    } else {
      queryResults.forEach((result) => {
        if (result.refetch) result.refetch();
      });
    }
  }, [priceGreaterThan, priceLessThan]);

  useEffect(() => {
    if (selectedBrands.length === 0) {
      setIsDataLoading(allProductsIsLoading);
      setIsDataError(isError);
      if (allProductsData) setProductsToBeDisplayed(allProductsData);
    } else {
      const isLoading = queryResults.some((result) => result.isLoading);
      setIsDataLoading(isLoading);
      const isError = queryResults.some((result) => result.isError);
      setIsDataError(isError);
      const allProducts = queryResults.flatMap((result) => result.data || []);

      setProductsToBeDisplayed(allProducts);
    }
  }, [
    selectedBrands,
    allProductsData,
    queryResults,
    priceGreaterThan,
    priceLessThan,
  ]);

  if (isDataError) return <div>Error loading products</div>;
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/5 bg-slate-200 h-full shadow-lg overflow-y-auto">
        <div className="p-5">
          <h1 className="text-center text-xl font-bold">Select Brands</h1>
          <div className="mt-4 h-20">
            <BrandsList />
            <PriceRangeSlider />
            {priceGreaterThan}
            {priceLessThan}
          </div>
        </div>
      </div>
      <div className="flex-1 w-4/5 p-4 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {isDataLoading || allDataRefetching ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            productsToBeDisplayed?.map((data) => (
              <ProductCard
                key={data.id}
                brand={data.brand}
                name={data.name}
                price={data.price}
                imageLink={data.image_link}
                rating={data.rating}
                description={data.description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
