import {Box, Badge, Image, Flex, Divider, Center } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

export default function AirbnbExample() {
  const property = {
    imageUrl: 'https://bungie.net/common/destiny2_content/icons/d16148d2696fab485de8dc0cfb407cd7.jpg',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }

  return (
    <Flex maxW='15vw' height='96px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} width='96px'/>
      <Center height='96px' width='20vw'><Divider orientation='vertical' /></Center>
      
      <Box p='3'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Badge borderRadius='full' px='2' colorScheme='yellow'>
            异域
          </Badge>
          {/* <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box> */}
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
          fontSize='1vw'
        >
          青龙协同之刃
        </Box>

        <Box>
          <Box as='span' color='gray.600' fontSize='sm' maxW='100px' isTruncated>
            个性文本信息123456789101112131415
          </Box>
        </Box>

      </Box>

    </Flex>
  )
}

// import React from "react";
// import { chakra, Box, Flex, useColorModeValue, HStack, Image } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";

// const Ma = () => {
//   return (
//     <Flex
//       bg={useColorModeValue("#F9FAFB", "gray.600")}
//       p={50}
//       w="full"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <Flex
//         maxW="10vw"
//         mx="auto"
//         maxH="15vh"
//         bg={useColorModeValue("white", "gray.800")}
//         shadow="lg"
//         rounded="lg"
//         overflow="hidden"
//       >
//         <Image src='https://bungie.net/common/destiny2_content/icons/d16148d2696fab485de8dc0cfb407cd7.jpg' width="7vw" alt='青龙协同之刃' />

//         <Box w={1 / 3} p={{ base: 4, md: 4 }}>
//           <chakra.h1
//             fontSize="2xl"
//             fontWeight="bold"
//             color={useColorModeValue("gray.800", "white")}
//           >
//             青龙协同之刃
//           </chakra.h1>

//           <chakra.p
//             mt={2}
//             fontSize="sm"
//             color={useColorModeValue("gray.600", "gray.400")}
//           >
//             你是猪你是猪你是猪
//           </chakra.p>

//           <Flex mt={3} alignItems="center" justifyContent="space-between">
//             <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
//               $220
//             </chakra.h1>
//             <chakra.button
//               px={2}
//               py={1}
//               bg="white"
//               fontSize="xs"
//               color="gray.900"
//               fontWeight="bold"
//               rounded="lg"
//               textTransform="uppercase"
//               _hover={{
//                 bg: "gray.200",
//               }}
//               _focus={{
//                 bg: "gray.400",
//               }}
//             >
//               Add to cart
//             </chakra.button>
//           </Flex>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default Ma;