import React from "react";
import Link from "next/link";
import {
  chakra,
  HStack,
  VisuallyHidden,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Box,
  MenuDivider,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { FaGithub } from 'react-icons/fa'
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import Goutou from '../../icons/goutou.svg'
import Fengche from "../../icons/fengcheR.svg";
import style from "../../styles/utils.module.css"
import Head from 'next/head'
import Script from 'next/script'
import { useSession, signIn, signOut } from "next-auth/react"
import {
  FiChevronDown,
} from 'react-icons/fi';
import Image from "next/image";
// import QQ from "../../icons/QQ.svg";

export default function MyHeader() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const { data: session } = useSession()
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Link href='/' passHref>
      <Button w="full" variant="ghost"  leftIcon={<AiFillHome />}>
        Home
      </Button>
      </Link>
      <Link href='/weapon' passHref>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        
        leftIcon={<AiOutlineInbox />}
      >
        Weapons
      </Button>
      </Link>
      {/* <Button
        w="full"
        variant="ghost"
        
        leftIcon={<BsFillCameraVideoFill />}
      >
        Videos
      </Button> */}
    </VStack>
  );
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      </Head>
      <Script src="https://cdn.splitbee.io/sb.js" strategy="lazyOnload" onError={(e) => {
          console.error('Script failed to load', e)
        }}/>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Flex
          w="full"
          h="7vh"
          px="6"
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack display="flex" spacing={3} alignItems="center">
            <Link href="/" passHref>
              <chakra.a
                title="Choc Home Page"
                display="flex"
                alignItems="center"
              >
                <img src={Fengche} className={style.Applogo} width='50px'/>
                <VisuallyHidden>Choc</VisuallyHidden>
              </chakra.a>
            </Link>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Link href='/' passHref>
                <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                  Home
                </Button>
              </Link>
              <Link href='/weapon' passHref>
                <Button
                  variant="solid"
                  colorScheme="brand"
                  leftIcon={<AiOutlineInbox />}
                  size="sm"
                >
                  Weapons
                </Button>
              </Link>
              {/* <Button
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
              >
                Weapons
              </Button> */}
            </HStack>
          </HStack>
          <Spacer />
          <Flex justify="flex-end" align="center" color="gray.400">
            {/* <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              <Button colorScheme="brand" variant="ghost" size="sm">
                Sign in
              </Button>
              <Button colorScheme="brand" variant="solid" size="sm">
                Sign up
              </Button>
            </HStack> */}
            <IconButton 
              as="a" 
              href="https://github.com/Tian-que" 
              size="md"
              variant="ghost"
              color="current"
              aria-label="GitHub" 
              icon={<FaGithub fontSize="1.25rem" />} 
            />
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <img src={Goutou} alt='goutou' width='187px'/>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue("gray.800", "inherit")}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
            {session ? 
            <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      session.user.image
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{session.user.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      角色占位
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>个人信息</MenuItem>
                <MenuItem>设置</MenuItem>
                <MenuItem>消息</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>退出</MenuItem>
              </MenuList>
            </Menu>
          </Flex>:
          <>
            <Button
              onClick={() => signIn()}
              variant="solid"
              colorScheme="cyan"
              size="sm"
            >
              登录
            </Button>
          </>}
          
          </Flex>
        </Flex>
        {MobileNavContent}
      </chakra.header>
    </React.Fragment>
  );
}




