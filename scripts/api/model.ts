import {existsSync, promises} from 'fs';
import path from 'path';
import crypto from 'crypto';

const json_dir = path.join(process.cwd(), 'json');
const public_dir = path.join(process.cwd(), 'public');

async function ModelCreate(model: modelAPIType) {
	const model_hero = model.hero.toLowerCase().replace(' ', '_');
	const model_event = model.event.toLowerCase().replace(' ', '_') as EventsNameType;
	
	const model_path = path.join(public_dir, 'models', model_hero, model_event);

	await promises.mkdir(path.join(public_dir, 'models', model_hero), {recursive: true});
	
	let key: string = crypto.randomBytes(16).toString('hex');
	while (existsSync(model_path + '_' + key + '.gltf')) {
		key = crypto.randomBytes(16).toString('hex');
	}

	await promises.writeFile(model_path + '_' + key + '.gltf', model.file);
	
	const model_client: modelClientType = {
		hero: model_hero,
		url: 'public/models/' + model_hero + '/' + model_event,
		event: model_event,
		key: key
	};

	await promises.mkdir(json_dir + '/models/' + model_hero, {recursive: true});
	const model_json = path.join(json_dir, 'models', model_hero, model_event);
	await promises.writeFile(model_json + '_' + key + '.json', JSON.stringify(model_client), 'utf-8');

	return 'models/' + model_hero + '?s=' + model_event;
}

export {ModelCreate};
