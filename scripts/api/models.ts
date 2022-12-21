import path from 'path';
import {existsSync, promises} from 'fs';

export default async function getModelsNames() {
	const json_dir = path.join(process.cwd(), 'json');

	const models: string[] = [];

	if (existsSync(json_dir + '/models') === false) {
		return [];
	}

	const heroes = await promises.readdir(json_dir + '/models');

	for (let idx = 0; idx < heroes.length; idx++) {
		const herodir = heroes[idx];
		const modeldir = await promises.readdir(json_dir + '/models/' + herodir);
		if (modeldir.length) {
			for (let k = 0; k < modeldir.length; k++) {
				const model = modeldir[k];
				models.push(herodir + '_' + model.slice(0, model.length - 5));
			}
		}
	}

	return models;
}
