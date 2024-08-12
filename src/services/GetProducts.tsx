import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetProductType } from "../Types/GetProductType";

const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";

const fetchProductDetails = async (
  brand: string,
  priceGreaterThan?: number,
  priceLessThan?: number,
) => {
  let url = `${baseUrl}${brand}`;
  const params = new URLSearchParams();

  if (priceGreaterThan !== undefined) {
    params.append("price_greater_than", priceGreaterThan.toString());
  }

  if (priceLessThan !== undefined) {
    params.append("price_less_than", priceLessThan.toString());
  }

  url += `&${params.toString()}`;
  const response = await axios.get(url);
  return response.data as GetProductType[];
};

const fetchALlProductDetails = async (
  priceGreaterThan?: number,
  priceLessThan?: number,
) => {
  let url = "http://makeup-api.herokuapp.com/api/v1/products.json";
  const params = new URLSearchParams();

  if (priceGreaterThan !== undefined) {
    params.append("price_greater_than", priceGreaterThan.toString());
  }

  if (priceLessThan !== undefined) {
    params.append("price_less_than", priceLessThan.toString());
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await axios.get(url);
  return response.data as GetProductType[];
};

export const GetProductByBrand = (
  brands: string[],
  priceGreaterThan?: number,
  priceLessThan?: number,
) => {
  return useQueries({
    queries: brands.map((brand) => ({
      queryKey: ["Products", brand],
      queryFn: () =>
        fetchProductDetails(brand, priceGreaterThan, priceLessThan),
      staleTime: 1000 * 60 * 5,
    })),
  });
  // }
};

export const GetAllProducts = (
  priceGreaterThan?: number,
  priceLessThan?: number,
) => {
  return useQuery({
    queryKey: ["GetAllProducts"],
    queryFn: () => fetchALlProductDetails(priceGreaterThan, priceLessThan),
  });
};
