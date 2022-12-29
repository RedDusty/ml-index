declare module '*.gltf';
declare module '*.glb';

type abilityCategoryType = 'passive' | 'skill' | 'ultimate' | 'extra';

type abilityEffectType = 'charge' | 'burst' | 'blink' | 'aoe' | 'buff';

type abilityTypeType = 'physical_skill' | 'charge' | 'blink';

type abilityEventIconsType = {
	name: string;
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

interface modelBaseType {
	hero: string;
	event: string;
	title: string;
	image: string;
}

interface modelMetaBaseType extends modelBaseType {
	key: string;
	v: number;
}

interface modelType extends modelMetaBaseType {
	url: string;
}

interface modelsType extends modelMetaBaseType {
	url?: string;
	file?: string;
}

interface modelIndexedDBType extends modelMetaBaseType {
	file: string;
}

interface modelAPIType extends modelBaseType {
	file: string;
}
