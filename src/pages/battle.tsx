import { useEffect, useState } from "react"
import { FaX } from "react-icons/fa6"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MonsterCard } from "../components/MonsterCard"
import { useLocalForage } from "../hooks/useStorageState"
import { Monster } from "../types/Monster"

export default function Battle() {
  const [searchParams] = useSearchParams()
  const { getAsync } = useLocalForage<Monster[]>('monsters', [])
  const navigate = useNavigate()

  const [firstCurrentState, setFirstCurrentState] = useState<Monster>()
  const [secondCurrentState, setSecondCurrentState] = useState<Monster>()
  const [turn, setTurn] = useState<Monster>()
  const [winner, setWinner] = useState<Monster>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAsync().then(monsters => {
      const first = monsters.find(m => m.id === searchParams.get('first'))
      const second = monsters.find(m => m.id === searchParams.get('second'))

      setFirstCurrentState(first)
      setSecondCurrentState(second)
      setIsLoading(false)

      if (!(first && second)) return
      if (first.speed === second.speed) {
        setTurn(first.attack > second.attack ? first : second)
        return
      }

      setTurn(first.speed > second.speed ? first : second)
    })
  }, [])

  const calculateTurn = () => {
    if (!firstCurrentState || firstCurrentState.hp <= 0 || !secondCurrentState || secondCurrentState.hp <= 0) return

    if (turn?.id === firstCurrentState.id) {
      const damage = (firstCurrentState.attack - secondCurrentState.defense) < 1 ? 1 : (firstCurrentState.attack - secondCurrentState.defense)

      setSecondCurrentState(prevState => {
        if (!prevState) return prevState

        const hasEnded = damage > prevState.hp
        if (hasEnded) setWinner(firstCurrentState)

        return { ...prevState, hp: hasEnded ? 0 : prevState.hp - damage }
      })

      setTurn(secondCurrentState)

      return
    }

    const damage = (secondCurrentState.attack - firstCurrentState.defense) < 1 ? 1 : (secondCurrentState.attack - firstCurrentState.defense)

    setFirstCurrentState(prevState => {
      if (!prevState) return prevState

      const hasEnded = damage > prevState.hp
      if (hasEnded) setWinner(secondCurrentState)

      return { ...prevState, hp: hasEnded ? 0 : prevState.hp - damage }
    })

    setTurn(firstCurrentState)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      calculateTurn();
    }, 1000);


    return () => clearTimeout(timeout);
  }, [turn]);

  if (isLoading || !firstCurrentState || !secondCurrentState) {
    return <div>
      <p>
        Carregando...
      </p>
    </div>;
  }

  return (
    <div className="bg-slate-600 min-h-[100dvh] w-[100%] p-2">
      <button
        className="text-slate-100"
        onClick={() => navigate(-1)}
      >
        Retornar
      </button>
      {
        winner ?
          <p className="text-lg text-amber-400 text-center">O vencedor foi {winner.name}</p>
          :
          <p className="text-lg text-slate-100 text-center">Turno de {turn?.name}</p>
      }
      <div className="flex justify-around gap-8 m-10">
        <MonsterCard monster={firstCurrentState} winner={winner && winner.id === firstCurrentState.id} />
        <FaX color='#f1f5f9' className="self-center" />
        <MonsterCard monster={secondCurrentState} winner={winner && winner.id === secondCurrentState.id} />
      </div>
    </div>)
}