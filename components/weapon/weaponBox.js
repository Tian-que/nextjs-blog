import {Box, Badge, Image, Flex, Center, Tag } from '@chakra-ui/react'
import {weaponTypeRichTextByCategoryHash} from '../../components/svgs/itemCategory.js'
import { damageTypeNameByEnum, damageTypeUrlByEnum } from '../../components/svgs/damageTypes.js';

export default function WeaponBox(params) {
  return (
    <Flex width={{base: "100%", md: "15vw"}} minW='12rem' height='5rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Center width='70px' pl='1'>
        <Image src={'https://bungie.net' + params.data.icon} alt={params.data.name} border='2px' borderRadius='lg' borderColor='white'  maxW='65px'/>
      </Center>
      <Box pl={{base: "2", md: "2"}} pt={{base: "1", md: "3"}} minW='7rem' maxW='60vw' overflow='hidden' isTruncated>
        <Box display={{base:"none", md: "flex"}} alignItems='baseline'>
          {params.isNew ? <Badge borderRadius='full' px='2' colorScheme='teal'>New</Badge> : undefined}
          {params.data.tierType === '异域' ? 
          <Badge borderRadius='full' px='2' pl='2' colorScheme='yellow'>异域</Badge> :
          <Badge borderRadius='full' px='2' pl='2' colorScheme='purple'>传说</Badge>}
        </Box>
        <Box display={{base:"flex", md: "none"}} alignItems='baseline'>
          {params.isNew ? <Badge borderRadius='full' px='2' colorScheme='teal'>New</Badge> : undefined}
          {params.data.tierType === '异域' ? 
          <Badge borderRadius='full' px='2' pl='2' colorScheme='yellow'>异域</Badge> :
          <Badge borderRadius='full' px='2' pl='2' colorScheme='purple'>传说</Badge>}
          <Badge borderRadius='full' px='2' pl='2' colorScheme='cyan' fontFamily='Destiny2'>{weaponTypeRichTextByCategoryHash[params.data.ich]}</Badge>
          <Badge borderRadius='full' px='2' pl='2' colorScheme='orange'>{params.data.season}</Badge>
          <Tag borderRadius='full' px='2' pl='2' colorScheme='gray'><Image width='0.8rem' src={damageTypeUrlByEnum[params.data.defaultDamageType]} /></Tag>
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