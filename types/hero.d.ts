type heroRangeType = 'melee'

type heroDamageType = 'physical'

type heroResourceType = 'energy' | 'mana'

type heroPriceType = {
	bp?: number;
	diamond?: number;
	tickes?: number;
}

type heroLaneType = 'jungle'

type heroSpecialtyType = 'chase' | 'reap';

type heroRoleType = 'assassin';

type heroRatingType = {
	durability: number;
	offense: number;
	control: number;
	difficulty: number;
}

type heroAttributeType = {
	lvl_min: number;
	lvl_max: number;
	growth: number | null;
} | {
	lvl: number;
	growth: number | null;
}

type heroAttributesBaseType = {
	hp: heroAttributeType;
	hp_regen: heroAttributeType;
	energy?: heroAttributeType;
	energy_regen?: heroAttributeType;
	physical_defense: heroAttributeType;
	magic_defense: heroAttributeType;
	damage_reduction: heroAttributeType;
	movement_speed: heroAttributeType;
	physical_attack: heroAttributeType;
	magic_power: heroAttributeType;
	attack_speed: heroAttributeType;
	physical_penetration: heroAttributeType;
	magic_penetration: heroAttributeType;
}

type heroAttributesPercentageType = {
	physical_penetration: number;
	magic_penetration: number;
	physical_lifesteal: number;
	magic_lifesteal: number;
	spell_vamp: number;
	critical_chance: number;
	critical_damage: number;
	critical_damage_reduction: number;
	damage_reduction: number;
	healing_effect: number;
	healing_received: number;
	resilience: number;
	cooldown_reduction: number;
}

type heroAbilitiesTwoUltType = {
	passive: string;
	extra?: string;
	skill1: string;
	skill2: string;
	ultimate: string;
}

type heroAbilitiesThreeUltType = {
	passive: string;
	extra: string;
	skill1: string;
	skill2: string;
	skill3: string;
	ultimate: string;
}

type heroAbilitiesFourType = {
	passive: string;
	skill1: string;
	skill2: string;
	skill3: string;
	skill4: string;
}

type heroAbilitiesTwoUltExchangeType = {
	passive: string;
	skill1: string | string[];
	skill2: string | string[];
	ultimate: string | string[];
}

type heroAbilitiesType = heroAbilitiesTwoUltType | heroAbilitiesThreeUltType | heroAbilitiesFourType | heroAbilitiesTwoUltExchangeType

type heroType = {
	portrait: string;
	name: string;
	subname: string;
	release: number;
	role: heroRoleType;
	specialty: heroSpecialtyType[];
	lane: heroLaneType;
	price: heroPriceType | null;
	resource: heroResourceType;
	damage: heroDamageType;
	range: heroRangeType;
	rating: heroRatingType;
	attributesBase: heroAttributesType;
	attributesPercentage: heroAttributesPercentageType;
	abilities: heroAbilitiesType;
}
