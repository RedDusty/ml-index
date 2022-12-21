import {promises} from 'fs';
import path from 'path';

const json_dir = path.join(process.cwd(), 'json');
const public_dir = path.join(process.cwd(), 'public');

async function AbilityCreate(ability: abilityType) {
	const ability_name = ability.name.toLowerCase().replace(' ', '_');
	const icon_buffer = Buffer.from(ability.icon.replace('data:image/webp;base64,', ''), 'base64');
	await promises.mkdir(public_dir + '/icons/abilities', {recursive: true});
	await promises.writeFile(public_dir + '/icons/abilities/' + ability_name + '.webp', icon_buffer);
	ability.icon = ability_name;
	for (let idx = 0; idx < ability.event_icons.length; idx++) {
		const event_icon_buffer = Buffer.from(ability.event_icons[idx].icon.replace('data:image/webp;base64,', ''), 'base64');
		const event_name = ability.event_icons[idx].name.toLowerCase().replace(' ', '_');
		await promises.mkdir(public_dir + '/icons/abilities/' + event_name, {recursive: true});
		await promises.writeFile(public_dir + '/icons/abilities/' + event_name + '/' + ability_name + '.webp', event_icon_buffer);
		ability.event_icons[idx].event_icon = event_name;
		ability.event_icons[idx].icon = ability_name;
	}
	const abilityBase: abilityBaseType = {
		category: ability.category,
		effects: ability.effects,
		event_icons: ability.event_icons,
		icon: ability.icon,
		name_base: ability.name_base.toLowerCase().replace(' ', '_'),
		types: ability.types
	};
	const abilityLang: abilityLangType = {
		attributes: ability.attributes,
		description: ability.description,
		lang: ability.lang,
		name: ability.name,
		notes: ability.notes,
		name_base: ability.name_base.toLowerCase().replace(' ', '_')
	};

	await promises.mkdir(json_dir + '/abilities/base', {recursive: true});
	await promises.writeFile(json_dir + '/abilities/base/' + ability.name + '.json', JSON.stringify(abilityBase), 'utf-8');
	await promises.mkdir(json_dir + '/abilities/' + ability.lang, {recursive: true});
	await promises.writeFile(json_dir + '/abilities/' + ability.lang + '/' + ability.name + '.json', JSON.stringify(abilityLang), 'utf-8');

	return 'abilities/' + ability_name;
}

export {AbilityCreate};
