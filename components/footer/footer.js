import {
  Box,
  Flex,
  useColorModeValue,
  Container,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import Fengche from '../../icons/fengche.svg'

export default function MyFooter() {
  return (
    <Container as="footer" role="contentinfo" maxW='90%'>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <img src={Fengche}  width='80px'/>
        </Flex>
        <Text pt={6} fontSize='md' textAlign={'center'}>
          &copy; {new Date().getFullYear()} 天阙. All rights reserved. 才没有这种东西呢~
        </Text>
      </Box>
    </Container>
  )
}