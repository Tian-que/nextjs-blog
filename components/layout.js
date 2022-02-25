import MyHeader from './header/myheader.js'
import MyFooter from './footer/footer.js'
import { Box } from '@chakra-ui/react'

export default function Layout({ children}) {
  return (
    <>
      <MyHeader />
      <Box>
        {children}
      </Box>
      <MyFooter />
    </>
  )
}