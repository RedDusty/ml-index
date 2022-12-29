import {getFirestore} from 'firebase-admin/firestore';
import {getStorage} from 'firebase-admin/storage';
import {firebase} from 'scripts/firebase';
import {signed_url_options, storage_portrait_path} from 'scripts/utils';

export default async function getModelsNames() {
	const models: modelType[] = [];

	const docs = await getFirestore(firebase).collection('models').listDocuments();

	for (let i = 0; i < docs.length; i++) {
		const doc = await docs[i].get();
		const model = doc.data() as modelType;
		if (model) {
			const link = await getStorage(firebase).bucket().file(storage_portrait_path(model.hero, model.key)).getSignedUrl(signed_url_options);
			model.image = link[0];
			models.push(model);
		}
	}
	
	models.sort((a, b) => a.hero === b.hero ? a.event < b.event ? -1 : 1 : a.hero < b.hero ? -1 : 1);

	return models;
}
