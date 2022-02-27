import { getWeapon } from "../../lib/weapon.js"
import WeaponDetails from "../weaponDisplay.js"

export function WeaponRender({wid}) {
  const { data, isLoading, isError } = getWeapon(wid)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load</div>

  return (
    <div>
      <WeaponDetails data = {data}/>
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