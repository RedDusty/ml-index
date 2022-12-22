import {getFirestore} from 'firebase-admin/firestore';
import {firebase} from 'scripts/firebase';

export default async function getModelsNames() {
	const models: string[] = [];

	const docs = await getFirestore(firebase).collection('models').listDocuments();

	for (let i = 0; i < docs.length; i++) {
		models.push(docs[i].id);
	}

	return models;
}
