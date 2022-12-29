type languagesType = 'en'

type generalAbilitiesType = {
	categories: abilityCategoryType[];
	effects: abilityEffectType[];
	types: abilityTypeType[];
}

type generalEventType = {
	name: string;
	icon?: string;
}

type generalType = {
	abilities: generalAbilitiesType;
	events: generalEventType[];
}

type editorType = 'hero' | 'ability' | 'model'

type viewerStateType = 'loading' | 'error' | 'not_found' | 'no_cache' | 'done'
