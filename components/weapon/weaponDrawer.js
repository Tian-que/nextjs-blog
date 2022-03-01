import {
  Badge,
  Button,
  Box, 
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import { WeaponRender } from './weaponRender.js'

export default function WeaponDrawer({name, hash, children}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} size='auto' width={{base: "100%", md: "auto"}} variant='ghost'>
        {children}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <WeaponRender wid={hash}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}