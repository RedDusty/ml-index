declare module '*.gltf';
declare module '*.glb';

type abilityCategoryType = 'passive' | 'skill' | 'ultimate' | 'extra';

type abilityEffectType = 'charge' | 'burst' | 'blink' | 'aoe' | 'buff';

type abilityTypeType = 'physical_skill' | 'charge' | 'blink';

type abilityAttributeType = {
	name: string;
	value: number | number[];
}

type abilityEventIconsType = {
	name: generalEventsNameType;
	event_icon: string;
	icon: string;
}

type languagesType = 'en'

interface abilityBaseType {
	name_base: string;
	category: abilityCategoryType;
	effects: abilityEffectType[];
	types: abilityTypeType[];
	icon: string;
	event_icons: abilityEventIconsType[];
}

interface abilityLangType {
	name_base: string;
	name: string;
	description: string;
	attributes: abilityAttributeType[];
	notes: string[];
	lang: languagesType;
}

interface abilityType extends abilityBaseType, abilityLangType {}

type generalAbilitiesType = {
	categories: abilityCategoryType[];
	effects: abilityEffectType[];
	types: abilityTypeType[];
}

type generalEventsNameType = 'The_Aspirants';

type generalEventType = {
	name: generalEventsNameType;
	icon: string;
}

type generalType = {
	abilities: generalAbilitiesType;
	events: generalEventType[];
}

type editorType = 'hero' | 'ability'
