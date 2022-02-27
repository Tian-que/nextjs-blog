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

export default function WeaponDrawer({name, children}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} size='auto' variant='ghost'>
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
            <WeaponRender wid={name}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}