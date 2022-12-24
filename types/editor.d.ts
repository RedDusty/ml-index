declare module '*.gltf';
declare module '*.glb';

type abilityCategoryType = 'passive' | 'skill' | 'ultimate' | 'extra';

type abilityEffectType = 'charge' | 'burst' | 'blink' | 'aoe' | 'buff';

type abilityTypeType = 'physical_skill' | 'charge' | 'blink';

type EventsNameType = 'default' | 'The_Aspirants';

type abilityEventIconsType = {
	name: EventsNameType;
	event_icon: string;
	icon: string;
}

type abilityAttributeType = {
	name: string;
	value: number | number[];
}

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

interface abilityType extends abilityBaseType, abilityLangType { }

// interface modelBaseType {
// 	name: string;
// 	event?: string;
// }

// interface modelClientType extends modelBaseType {
// 	file: File
// }

// interface modelAPICreateType extends modelBaseType {
// 	file: File;
// 	url: string
// }

type modelType = {
	hero: string;
	event: EventsNameType;
	key: string;
	v: number;
	url: string;
}

type modelLocalType = {
	file: string;
	v: number;
}

type modelAPIType = {
	hero: string;
	event: EventsNameType;
	file: string;
}
