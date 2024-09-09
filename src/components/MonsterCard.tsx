import { FaPlus, FaRunning } from "react-icons/fa"
import { Monster } from "../types/Monster"
import { LuShield, LuSwords } from "react-icons/lu"

export const MonsterCard = ({ monster, winner }: { monster: Monster, winner?: boolean }) => {
  const { attack, defense, hp, image, name, speed } = monster

  return (
    <div
      className={`w-72 pb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center ${winner && 'dark:border-amber-400 dark:border-2'}`}
    >
      <img src={image} className="rounded-t-lg max-h-48 w-full object-contain" alt={`Monster ${name}`} />
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <div className="flex flex-col items-center gap-2 *:flex *:items-center *:gap-2">
        <div>
          <FaPlus title="Vida" color="#00FF00" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {hp}
          </p>
        </div>

        <div>
          <LuSwords title="Ataque" color="#FF0000" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {attack}
          </p>
        </div>

        <div>
          <LuShield title="Defesa" color="#0000FF" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {defense}
          </p>
        </div>

        <div>
          <FaRunning title="Velocidade" color="#F2A300" />
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {speed}
          </p>
        </div>
      </div>
    </div>
  )
}