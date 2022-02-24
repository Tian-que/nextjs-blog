import { useRouter } from 'next/router'
import { getWeapon } from '../../lib/weapon.js'
import WeaponDetails from '../../components/weaponDisplay.js'

function Weapon() {
  const router = useRouter()
  const { wid } = router.query
  const { weapon, isLoading, isError } = getWeapon(wid)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load</div>

  return (
    <div>
      <WeaponDetails data = {weapon}/>
      <style global jsx>{`
        body {
          font: 22px "Microsoft YaHei", Futura, sans-serif ;
        }

        ::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
      `}</style>
    </div>
  )
}

export default Weapon