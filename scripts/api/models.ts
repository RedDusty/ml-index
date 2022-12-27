import {getFirestore} from 'firebase-admin/firestore';
import {firebase} from 'scripts/firebase';

export default async function getModelsNames() {
	const models: modelType[] = [];

	const docs = await getFirestore(firebase).collection('models').listDocuments();

	for (let i = 0; i < docs.length; i++) {
		const doc = await docs[i].get();
		const model = doc.data() as modelType;
		if (model) {
			models.push(model);
		}
	}
	
	models.sort((a, b) => a.hero === b.hero ? a.event < b.event ? -1 : 1 : a.hero < b.hero ? -1 : 1);

	return models;
}
