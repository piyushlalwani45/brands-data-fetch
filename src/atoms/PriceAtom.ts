import { atom, useAtom } from "jotai";

export const priceGreaterThanAtom = atom<number | undefined>();
export const priceLessThanAtom = atom<number | undefined>();

export const usePriceAtom = () => {
  const [priceGreaterThan, setpriceGreaterThan] = useAtom(priceGreaterThanAtom);
  const [priceLessThan, setpriceLessThan] = useAtom(priceLessThanAtom);

  return {
    priceGreaterThan,
    priceLessThan,
    setpriceGreaterThan,
    setpriceLessThan,
  };
};
