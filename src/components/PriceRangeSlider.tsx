import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Text,
} from "@chakra-ui/react";
import { usePriceAtom } from "../atoms/PriceAtom";

const PriceRangeSlider = () => {
  const {
    setpriceGreaterThan,
    setpriceLessThan,
    priceGreaterThan,
    priceLessThan,
  } = usePriceAtom();
  const handlePriceChange = (value: number[]) => {
    setpriceGreaterThan(value[0]);
    setpriceLessThan(value[1]);
  };
  return (
    <div>
      <Text>Select Price</Text>
      <RangeSlider
        aria-label={["min", "max"]}
        onChange={handlePriceChange}
        min={0}
        max={100}
        step={5}
      >
        <RangeSliderTrack bg="red.100">
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Box>{priceGreaterThan}</Box>
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={6} index={1}>
          <Box>{priceLessThan}</Box>
        </RangeSliderThumb>
      </RangeSlider>

      <Box mt={4}>
        Selected range: {priceGreaterThan} - {priceLessThan}
      </Box>
    </div>
  );
};

export default PriceRangeSlider;
