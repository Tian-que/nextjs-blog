import {Box, Badge, Image, Flex, Center } from '@chakra-ui/react'

export default function WeaponBox(params) {
  return (
    <Flex width='15vw' minW='12rem' height='5rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Center width='5rem' pl='1'>
        <Image src={'https://bungie.net' + params.data.icon} alt={params.data.name} border='2px' borderRadius='lg' borderColor='white' minW='4rem' width='4.5vw'/>
      </Center>
      <Box pl='1vw' pt='3' minW='7rem' maxW='9.5vw' overflow='hidden'>
        <Box display='flex' alignItems='baseline'>
          {params.isNew ? <Badge borderRadius='full' px='2' colorScheme='teal'>New</Badge> : undefined}
          {params.data.tierType === '异域' ? 
          <Badge borderRadius='full' px='2' pl='2' colorScheme='yellow'>异域</Badge> :
          <Badge borderRadius='full' px='2' pl='2' colorScheme='purple'>传说</Badge>}
          
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
          fontSize='1rem'
          textAlign='left'
          
        >
          {params.data.name}
        </Box>
        <Center pt='1'>
          <Box as='span' color='gray.600' fontSize='sm' maxW='100%' isTruncated>
            {params.data.flavorText}
          </Box>
        </Center>

      </Box>

    </Flex>
  )
}