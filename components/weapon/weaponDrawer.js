import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import { WeaponRender } from './weaponRender.js'

export default function WeaponDrawer({name}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} variant='ghost' fontSize='1.2rem'>
        {name}
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