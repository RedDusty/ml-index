import React from 'react';
import axios from 'axios';
import EditorAbilityAttribute from 'components/editors/ability/EditorAbilityAttribute';
import EditorAbilityIcons from 'components/editors/ability/EditorAbilityIcons';
import EditorAbilityCET from 'components/editors/ability/EditorAbilityCET';

const initAbility: abilityType = {
	name: 'name',
	name_base: 'name',
	attributes: [],
	effects: [],
	category: 'passive',
	types: [],
	notes: [],
	description: '',
	event_icons: [],
	icon: '',
	lang: 'en'
};

const initAbilities: generalAbilitiesType = {categories: [], effects: [], types: []};

export default function EditorAbility() {
	const [ability, setAbility] = React.useState<abilityType>(initAbility);

	const [abilities, setAbilities] = React.useState<generalAbilitiesType>(initAbilities);
	const [note, setNote] = React.useState<string>('');

	React.useEffect(() => {
		const source = axios.CancelToken.source();

		async function fetchData() {
			try {
				const res = await axios.get('api/editor/read', {
					cancelToken: source.token,
					params: {
						ctype: 'abilities'
					}
				});
				if (res.data) {
					const abilities = res.data as generalAbilitiesType;
	
					setAbilities({
						categories: abilities.categories ?? [],
						effects: abilities.effects ?? [],
						types: abilities.types ?? []
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchData();
		return () => {
			source.cancel();
		};
	}, []);

	const abilityNameHandler = (v: string) => {
		setAbility((prev) => {
			return {
				...prev,
				name_base: v
			};
		});
	};

	const abilityNameLangHandler = (v: string) => {
		setAbility((prev) => {
			return {
				...prev,
				name: v
			};
		});
	};

	const abilityDescriptionHandler = (v: string) => {
		setAbility((prev) => {
			return {
				...prev,
				description: v
			};
		});
	};

	const abilityNoteAddHandler = () => {
		setAbility((prev) => {
			const temp = note;
			setNote('');
			return {
				...prev,
				notes: prev.notes.concat(temp)
			};
		});
	};

	const abilityCreate = () => {
		axios.post('api/editor/create', ability, {
			params: {
				editor: 'ability'
			}
		});
	};

	return (
		<>
			<div className='w-full flex justify-center items-center gap-x-4'>
				<button className='bg-white hover:bg-sky-300 hover:text-sky-900 font-semibold p-2 rounded-md cursor-not-allowed'>Preview</button>
				<h1 className='text-white font-bold text-2xl text-center py-4'>
					Ability editor
				</h1>
				<button className='bg-white hover:bg-green-300 hover:text-green-900 font-semibold p-2 rounded-md' onClick={abilityCreate}>Create</button>
			</div>
			<div className='flex flex-col w-fit gap-4 p-4 mx-auto bg-white bg-opacity-10 rounded-md'>
				{/* NAMES */}
				<div className='flex gap-2 flex-wrap'>
					<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-fit'>
						<label htmlFor="aName" className='font-semibold'>Name</label>
						<input
							type="text"
							id="aName"
							className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
							value={ability.name_base}
							onChange={(e) => abilityNameHandler(e.currentTarget.value)} />
					</div>
					<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-fit'>
						<label htmlFor="aNameLang" className='font-semibold'>Name lang</label>
						<input
							type="text"
							id="aNameLang"
							className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
							value={ability.name}
							onChange={(e) => abilityNameLangHandler(e.currentTarget.value)} />
					</div>
				</div>
				{/* CATEGORY EFFECTS TYPES */}
				<EditorAbilityCET abilities={abilities} ability={ability} setAbility={setAbility} />
				{/* DESCRIPTION */}
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 flex gap-x-2'>
					<label htmlFor="aDesc" className='font-semibold'>Description</label>
					<textarea
						className='bg-zinc-300 group-hover:bg-sky-300 px-1 rounded-md w-full'
						value={ability.description}
						id='aDesc'
						onChange={(e) => abilityDescriptionHandler(e.currentTarget.value)}
					></textarea>
				</div>
				{/* NOTES */}
				<div className={(ability.notes.length ? 'block' : 'hidden') + ' bg-white hover:bg-sky-100 group rounded-md p-2'}>
					<p className='font-semibold'>Notes</p>
					<ul className='list-disc list-inside ml-2'>
						{ability.notes.map((n, idx) => {
							return <div key={n + idx} className='flex gap-2 py-1 border-b last:border-b-0 border-solid border-zinc-500'>
								<li className='list-item'></li>
								<button className='bg-sky-300 hover:bg-red-300 hover:text-red-900 rounded-md h-fit p-1'>Remove</button>
								<p>{n}</p>
							</div>;
						})}
					</ul>
				</div>
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 flex gap-x-2'>
					<div>
						<label htmlFor="aNote" className='font-semibold'>Note</label>
						<button className='bg-sky-300 hover:bg-orange-300 rounded-md p-2 h-fit' onClick={abilityNoteAddHandler}>Add note</button>
					</div>
					<textarea
						className='bg-zinc-300 group-hover:bg-sky-300 px-1 rounded-md w-full'
						value={note}
						id='aNote'
						onChange={(e) => setNote(e.currentTarget.value)}
					></textarea>
				</div>
				{/* ATTRIBUTES */}
				<EditorAbilityAttribute attributes={ability.attributes} setAbility={setAbility} />
				{/* ICONS */}
				<EditorAbilityIcons setAbility={setAbility} event_icons={ability.event_icons} />
			</div>
		</>	
	);
}
