import {promises} from 'fs';
import path from 'path';

const json_dir = path.join(process.cwd(), 'json');
const public_dir = path.join(process.cwd(), 'public');

async function ModelCreate(model: modelAPIType) {
	const model_hero = model.hero.toLowerCase().replace(' ', '_');
	const model_event = model.event ? model.event.toLowerCase().replace(' ', '_') : null;
	const model_path = path.join(public_dir, 'models', model_hero + '/');
	await promises.mkdir(model_path, {recursive: true});
	await promises.writeFile(model_path + (model_event ? model_event : 'default') + '.gltf', model.file);
	
	const model_not_api: modelClientType = {
		hero: model_hero,
		url: 'public/models/' + model_hero + '/' + (model_event ? model_event : 'default')
	};

	if (model_event) {
		model_not_api.event = model_event as EventsNameType;
	}

	await promises.mkdir(json_dir + '/models/' + model_hero, {recursive: true});
	const model_json = path.join(json_dir, 'models', model_hero);
	await promises.writeFile(model_json + '/' + (model_event ? model_event : 'default') + '.json', JSON.stringify(model_not_api), 'utf-8');

	return 'models/' + model_hero + '?s=' + (model_event ? model_event : 'default');
}

export {ModelCreate};
