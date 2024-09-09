import { useState } from "react";
import { FaPlus, FaRunning } from "react-icons/fa";
import { LuShield, LuSwords } from "react-icons/lu";
import { CardFormModal } from "../components/CardFormModal";
import { useLocalForage } from "../hooks/useStorageState";
import { Monster } from "../types/Monster";
import { Link } from "react-router-dom";



export default function Home() {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedMonsters, setSelectedMonsters] = useState<string[]>([])

	const { storedValue: monsters, setValue: setMonsters } = useLocalForage<Monster[]>('monsters', [])

	if (!monsters) return (
		<div>
			<p className="text-red-600">Erro carregando monstros</p>
		</div>
	)

	return (
		<div className="bg-slate-600 min-h-[100dvh] w-[100%]">
			<div className="grid grid-cols-5 auto-rows-auto gap-4 p-4">
				<button
					className="text-slate-300 border-2 border-solid border-slate-300 rounded p-2 w-56 self-center justify-self-center text-center"
					onClick={() => setIsModalVisible(true)}>
					<p className="text-6xl text-slate-300">+</p>
					Criar monstro
				</button>
				{monsters?.map(m => (
					<div
						key={m.id}
						onClick={() => {
							setSelectedMonsters(prevState =>
								prevState.includes(m.id) ? prevState.filter(s => s !== m.id) : prevState.concat(m.id)
							)
						}
						}
						className={`max-w-sm pb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 text-center ${selectedMonsters.includes(m.id) && 'dark:border-white dark:border-2'}`}
					>
						<img src={m.image} className="rounded-t-lg max-h-48 w-full object-contain" alt={`Monster ${m.name}`} />
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{m.name}</h5>
						<div className="flex flex-col items-center gap-2 *:flex *:items-center *:gap-2">
							<div>
								<FaPlus title="Vida" color="#00FF00" />
								<p className="font-normal text-gray-700 dark:text-gray-400">
									{m.hp}
								</p>
							</div>

							<div>
								<LuSwords title="Ataque" color="#FF0000" />
								<p className="font-normal text-gray-700 dark:text-gray-400">
									{m.attack}
								</p>
							</div>

							<div>
								<LuShield title="Defesa" color="#0000FF" />
								<p className="font-normal text-gray-700 dark:text-gray-400">
									{m.defense}
								</p>
							</div>

							<div>
								<FaRunning title="Velocidade" color="#F2A300" />
								<p className="font-normal text-gray-700 dark:text-gray-400">
									{m.speed}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			{selectedMonsters.length === 2 &&
				<button className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-blue-300 rounded-md">
					<Link className="text-white" to={`battle?first=${selectedMonsters[0]}&second=${selectedMonsters[1]}`}>
						Criar combate
					</Link>
				</button>
			}
			<CardFormModal isVisible={isModalVisible} setCloseModal={() => setIsModalVisible(false)} monsters={monsters} setMonsters={setMonsters} />
		</div>
	)
}