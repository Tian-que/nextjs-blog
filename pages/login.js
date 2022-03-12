import { ButtonGroup, Button, VisuallyHidden, Center, Text, Box, Divider, Img, Flex, chakra, Spacer} from "@chakra-ui/react"
import Image from "next/image"
import { Image as ChakraImage}  from "@chakra-ui/react"
import Head from "next/head"
import style from '../components/today/today.module.css'

export default function Login() {
  return (
    <Center bg='rgb(14, 21, 27)' width='100vw' color='white'>
      <Head>  
        <title>命运2日报</title>
      </Head>
      <Box  maxW='1920px' width='100vw' bgSize='contain' bgRepeat='no-repeat' padding='0rem 0px 0px' bgImage={'url("https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt58ebe92f5c2985f3/620be743510c6b1c87b8a9d7/story-bg.jpg")'}>
        {/* <ChakraImage layout='fill' src='https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt58ebe92f5c2985f3/620be743510c6b1c87b8a9d7/story-bg.jpg' /> */}
        {/* <div className={style.todayHeader} style = {{backgroundImage: 'url("https://images.contentstack.io/v3/assets/blte410e3b15535c144/blt58ebe92f5c2985f3/620be743510c6b1c87b8a9d7/story-bg.jpg")'}}/> */}
        <Box pt='20vw' pl='7.5vw' width='80vw' >
          <Box w='9vw' height='0.8vw' bg='cyan.300' color='white'/>
          <Box fontSize='7.2vw' pt='3vw' fontWeight='bold'>
            《命运2》日报
          </Box>
        </Box>
        <Center pt='3vw'>
          <Box w='80%'>
            <Flex fontSize='2vw' fontWeight='light' opacity='0.5'>
              <chakra.span>2022年3月13日</chakra.span>
              <Spacer/>
              <chakra.span>苏生赛季第3周</chakra.span>
            </Flex>
          </Box>
        </Center>
        <Divider orientation='horizontal' pt='0.3vw' opacity='0.4'/>
        <Center pt='3.5vw' display='grid'>
          <Box 
            width='85vw' 
            h='17vw' 
            borderColor='rgb(60,60,60)' 
            borderWidth='0.2vw' 
            borderRadius='sm'
            bgImg={'linear-gradient(90deg, rgb(14, 21, 27) 0%, rgba(0,0,0,0) 25%), url("https://bungie.net/img/destiny_content/pgcr/moon_k1_logistics.jpg")'}
            bgSize='60vw'
            bgClip='content-box'
            bgPos='25vw center'
            bgRepeat='no-repeat'
            // bgGradient='linear(to-r, rgba(14, 21, 27, 1) 40%, rgba(14, 21, 27, 0))'
          >
            <Box
              w='100%'
              h='100%'
              bgRepeat='no-repeat'
              bgSize='15vw'
              bgPos = '3vw'
              bgImg={'linear-gradient(90deg, rgba(14,21,27,90%) 0%, rgba(14,21,27,90%) 80%), url("https://bungie.net/common/destiny2_content/icons/DestinyActivityModeDefinition_7d11acd7d5a3daebc0a0c906452932d6.png")'}
            >
              <Box pl='3vw' pt='2vw'>
                <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>遗失区域</Text>
                <Divider opacity='0.4' pt='0.4vw' w='35vw'/>
                <Text fontSize='5vw' fontWeight='light' >K1后勤区</Text>
                <Flex>
                  <ChakraImage w='3vw' className={style.opacityText} src='https://bungie.net/common/destiny2_content/icons/c60303e278aa5fc566a04e98c3d8024c.png' />
                  <Text fontSize='2vw' fontWeight='light' className={style.opacityText}>月球 · 地狱深渊</Text>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box mt='1.3vw' w='100%' h='4.6vw' bg='#513065'>

          </Box>
        </Center>
        <Center pt='1vw' height='80vw' display='block'>
          {/* <Divider orientation='horizontal' /> */}
        </Center>
        <Center>
          <Box width='80%'>456</Box>
        </Center>
      </Box>
    </Center>
  )
}

// // This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const todayUserToken = await getTodayUserToken()
//   const test2 = await getTodayInfo(todayUserToken)
//   const test = 0
//   return {
//     props: {
//       a:1
//     },
//   }
// }
