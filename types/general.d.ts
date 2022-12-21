type languagesType = 'en'

type generalAbilitiesType = {
	categories: abilityCategoryType[];
	effects: abilityEffectType[];
	types: abilityTypeType[];
}

type generalEventType = {
	name: EventsNameType;
	icon?: string;
}

type generalType = {
	abilities: generalAbilitiesType;
	events: generalEventType[];
}

type editorType = 'hero' | 'ability' | 'model'
