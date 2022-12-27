import localforage from 'localforage';

export default async function cachedCheck(prop_models: modelType[]) {
	const lfh = localforage.createInstance({name: 'heroes', storeName: 'heroes'});
	const c_models: modelCacheType[] = [];
	const s_models: modelType[] = [];
	
	for (let idx = 0; idx < prop_models.length; idx++) {
		const model = prop_models[idx];
		const cached_model = await lfh.getItem(model.hero + '_' + model.event + '_' + model.key) as modelIndexedDBType;
		if (cached_model) {
			c_models.push({hero: model.hero, event: model.event, key: model.key, v: model.v, file: cached_model.file});
		} else s_models.push(model);
	}

	const models: modelsType[] = [];

	models.push(...c_models);
	models.push(...s_models);

	models.sort((a, b) => a.hero === b.hero ? a.event < b.event ? -1 : 1 : a.hero < b.hero ? -1 : 1);

	return models;
}
