import { z } from "zod"
import { Monster } from "../types/Monster"

interface CardFormModalProps {
	isVisible: boolean
	monsters: Monster[],
	setMonsters: (monsters: Monster[]) => void
	setCloseModal: () => void
}

const createMonsterSchema = z.object({
	name: z.string().min(1, { message: 'Insira um nome' }),
	hp: z.coerce.number(),
	attack: z.coerce.number(),
	speed: z.coerce.number(),
	defense: z.coerce.number(),
	image: z.string().url(),
})

export function CardFormModal({ isVisible, setCloseModal, monsters, setMonsters }: CardFormModalProps) {
	if (!isVisible) return

	return (
		<>
			<div className="fixed left-0 top-0 w-[100%] h-[100%] z-40" onClick={() => setCloseModal()} />

			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[100%] h-96 max-h-[100%] bg-slate-400 z-50">
				<form
					className="absolute top-0 left-0 w-[100%] h-[100%] p-5 overflow-auto"
					onClick={e => e.stopPropagation()}
					onSubmit={(event) => {
						const formData = new FormData(event.currentTarget);
						const result = createMonsterSchema.safeParse(Object.fromEntries(formData.entries()))

						if (!result.success) {
							console.error('Error creating a monster', result.error)
							return
						}

						const id = Date.now().toString(36)

						setMonsters(monsters?.concat({ ...result.data, id }) ?? [])
					}}>
					<div className="flex flex-col gap-2">
						<p className="p-1 text-center text-lg">
							Crie um monstro
						</p>
						<label htmlFor="name">Nome</label>
						<input name='name' />

						<label htmlFor="attack">Ataque</label>
						<input name='attack' type='number' />

						<label htmlFor="defense">Defesa</label>
						<input name='defense' type='number' />

						<label htmlFor="speed">Velocidade</label>
						<input name='speed' type='number' />

						<label htmlFor="hp">Vida</label>
						<input name='hp' type='number' />

						<label htmlFor="image">Imagem</label>
						<input name='image' type="url" />

						<button type='submit' className="bg-slate-200">Criar monstro</button>
					</div>
				</form>
			</div>
		</>
	)
}