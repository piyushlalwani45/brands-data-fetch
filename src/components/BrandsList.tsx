import { Checkbox, VStack, Box, Text } from "@chakra-ui/react";
import { useBrandsAtom } from "../atoms/BrandsAtom";

type Brand = {
  id: string;
  name: string;
};

const brands: Brand[] = [
  { id: "almay", name: "Almay" },
  { id: "alva", name: "Alva" },
  { id: "anna sui", name: "Anna Sui" },
  { id: "annabelle", name: "Annabelle" },
  { id: "maybelline", name: "Maybelline" },
  { id: "covergirl", name: "Covergirl" },
  { id: "dior", name: "Dior" },
  { id: "benefit", name: "Benefit" },
  { id: "boosh", name: "Boosh" },
  { id: "burt's bees", name: "Burt's Bees" },
  { id: "butter london", name: "Butter London" },
  { id: "c'est moi", name: "C'est Moi" },
  { id: "cargo cosmetics", name: "Cargo Cosmetics" },
  { id: "china glaze", name: "China Glaze" },
  { id: "clinique", name: "Clinique" },
  { id: "coastal classic creation", name: "Coastal Classic Creation" },
  { id: "colourpop", name: "Colourpop" },
  { id: "dalish", name: "Dalish" },
  { id: "deciem", name: "Deciem" },
  { id: "dr. hauschka", name: "Dr. Hauschka" },
  { id: "e.l.f.", name: "E.L.F." },
  { id: "essie", name: "Essie" },
  { id: "fenty", name: "Fenty" },
  { id: "glossier", name: "Glossier" },
  { id: "green people", name: "Green People" },
  { id: "iman", name: "Iman" },
  { id: "l'oreal", name: "L'Oreal" },
  { id: "lotus cosmetics usa", name: "Lotus Cosmetics USA" },
  { id: "maia's mineral galaxy", name: "Maia's Mineral Galaxy" },
  { id: "marcelle", name: "Marcelle" },
  { id: "marienatie", name: "Marienatie" },
  { id: "milani", name: "Milani" },
  { id: "mineral fusion", name: "Mineral Fusion" },
  { id: "misa", name: "Misa" },
  { id: "mistura", name: "Mistura" },
  { id: "moov", name: "Moov" },
  { id: "nudus", name: "Nudus" },
  { id: "nyx", name: "NYX" },
  { id: "orly", name: "Orly" },
  { id: "pacifica", name: "Pacifica" },
  { id: "penny lane organics", name: "Penny Lane Organics" },
  { id: "physicians formula", name: "Physicians Formula" },
  { id: "piggy paint", name: "Piggy Paint" },
  { id: "pure anada", name: "Pure Anada" },
  { id: "rejuva minerals", name: "Rejuva Minerals" },
  { id: "revlon", name: "Revlon" },
  { id: "sally b's skin yummies", name: "Sally B's Skin Yummies" },
  { id: "salon perfect", name: "Salon Perfect" },
  { id: "sante", name: "Sante" },
  { id: "sinful colours", name: "Sinful Colours" },
  { id: "smashbox", name: "Smashbox" },
  { id: "stila", name: "Stila" },
  { id: "suncoat", name: "Suncoat" },
  { id: "w3llpeople", name: "W3LLPeople" },
  { id: "wet n wild", name: "Wet N Wild" },
  { id: "zorah", name: "Zorah" },
  { id: "zorah biocosmetiques", name: "Zorah Biocosmetiques" },
];

const BrandsList = () => {
  const { selectedBrands, setSelectedBrands } = useBrandsAtom();

  const handleCheckboxChange = (brandId: string) => {
    setSelectedBrands((prevSelected) => {
      if (prevSelected.includes(brandId)) {
        return prevSelected.filter((id) => id !== brandId);
      } else {
        return [...prevSelected, brandId];
      }
    });
  };

  return (
    <Box p={4}>
      <Text mb={4}>Select Brands:</Text>
      <VStack spacing={2} align="start">
        {brands.map((brand) => (
          <Checkbox
            key={brand.id}
            isChecked={selectedBrands.includes(brand.id)}
            onChange={() => handleCheckboxChange(brand.id)}
            colorScheme="blue"
          >
            {brand.name}
          </Checkbox>
        ))}
      </VStack>
      <Box mt={4}>
        <Text fontWeight="bold">Selected Brands:</Text>
        <Text>{JSON.stringify(selectedBrands)}</Text>
      </Box>
    </Box>
  );
};

export default BrandsList;
