type props = {
	abilities: generalAbilitiesType;
	ability: abilityBaseType;
	setAbility: React.Dispatch<React.SetStateAction<abilityType>>;
}

export default function EditorAbilityCET({abilities, ability, setAbility}: props) {
	
	const abilityCategoryHandler = (v: abilityCategoryType) => {
		setAbility((prev) => {
			return {
				...prev,
				category: v
			};
		});
	};

	const abilityEffectsHandler = (v: abilityEffectType) => {
		setAbility((prev) => {
			if (prev.effects.includes(v)) {
				return {
					...prev,
					effects: prev.effects.filter((el, idx) => el !== v)
				};
			} else {
				return {
					...prev,
					effects: prev.effects.concat(v)
				};
			}
		});
	};

	const abilityTypesHandler = (v: abilityTypeType) => {
		setAbility((prev) => {
			if (prev.types.includes(v)) {
				return {
					...prev,
					types: prev.types.filter((el, idx) => el !== v)
				};
			} else {
				return {
					...prev,
					types: prev.types.concat(v)
				};
			}
		});
	};

	return (
		<div className='flex flex-row flex-wrap gap-2'>
		<div className='bg-white hover:bg-sky-100 group border-solid border-zinc-300 rounded-md p-2 flex flex-col gap-1'>
			<p className='font-semibold'>Effects</p>
			{abilities.effects.map((e, idx) => {
				return <div key={e + idx} className="flex items-center gap-1">
					<label 
						htmlFor={'aEffect' + e + idx} 
						className={'capitalize' + (ability.effects.includes(e as abilityEffectType) ? ' text-orange-600 font-semibold' : '')}>
						{e.replace('_', ' ')}
					</label>
					<input 
						type="checkbox" 
						id={'aEffect' + e + idx} 
						className='accent-orange-600'
						checked={ability.effects.includes(e as abilityEffectType)} 
						onChange={() => abilityEffectsHandler(e as abilityEffectType)} />
				</div>;
			})}
		</div>
		<div className='bg-white hover:bg-sky-100 group border-solid border-zinc-300 rounded-md p-2 flex flex-col gap-1'>
			<p className='font-semibold'>Types</p>
			{abilities.types.map((e, idx) => {
				return <div key={e + idx} className="flex items-center gap-1">
					<label 
						htmlFor={'aType' + e + idx} 
						className={'capitalize' + (ability.types.includes(e as abilityTypeType) ? ' text-orange-600 font-semibold' : '')}>
						{e.replace('_', ' ')}
					</label>
					<input 
						type="checkbox" 
						id={'aType' + e + idx} 
						className='accent-orange-600'
						checked={ability.types.includes(e as abilityTypeType)} 
						onChange={() => abilityTypesHandler(e as abilityTypeType)} />
				</div>;
			})}
		</div>
		<div className='bg-white hover:bg-sky-100 group border-solid border-zinc-300 rounded-md p-2 flex flex-col gap-1'>
			<p className='font-semibold'>Category</p>
			{abilities.categories.map((c, idx) => {
				return <div key={c + idx} className='flex items-center gap-1'>
					<label 
						htmlFor={'aCategory' + c + idx} 
						className={'capitalize' + (ability.category === c ? ' text-orange-600 font-semibold' : '')}>
						{c.replace('_', ' ')}
					</label>
					<input 
						type="radio" 
						name='aCategory'
						id={'aCategory' + c + idx} 
						value={c}
						className='accent-orange-600'
						checked={ability.category === c} 
						onChange={() => abilityCategoryHandler(c)} />
				</div>;
			})}
		</div>
	</div>
	);
}
