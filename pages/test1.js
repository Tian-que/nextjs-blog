import React from "react";
import { Box, Flex, Image, Badge, useColorModeValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
const Cpwe = () => {
  const property = {
    imageUrl: "https://bungie.net/common/destiny2_content/icons/d16148d2696fab485de8dc0cfb407cd7.jpg",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (

      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="xs"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            aaaaaaaaaaaaaaaaa啊实打实aaaaaaaaaaaaaaaa啊实打实aaaaaaaaaaaaaaa啊实打实的
          </Box>

          <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    
  );
};

export default Cpwe;