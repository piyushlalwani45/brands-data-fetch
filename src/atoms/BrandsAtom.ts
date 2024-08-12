import { atom, useAtom } from "jotai";

export const brandsAtom = atom<string[]>([]);

export const useBrandsAtom = () => {
  const [selectedBrands, setSelectedBrands] = useAtom(brandsAtom);

  return {
    selectedBrands,
    setSelectedBrands,
  };
};
