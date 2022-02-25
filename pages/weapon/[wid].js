import { useRouter } from 'next/router'
import { WeaponRender } from '../../components/weapon/weaponRender.js'

function Weapon() {
  const router = useRouter()
  const { wid } = router.query
  return <WeaponRender wid={wid} />
}

export default Weapon