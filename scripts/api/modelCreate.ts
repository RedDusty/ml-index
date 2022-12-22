import crypto from 'crypto';
import {getStorage} from 'firebase-admin/storage';
import {getFirestore} from 'firebase-admin/firestore';
import {firebase} from 'scripts/firebase';
import {Stream} from 'stream';

async function ModelCreate(model: modelAPIType) {
	const model_hero = model.hero.toLowerCase().replace(' ', '_');
	const model_event = model.event.toLowerCase().replace(' ', '_') as EventsNameType;
	
	const key: string = crypto.randomBytes(8).toString('hex');

	const model_url = `models/${model_hero}/${model_event + '_' + key}.gltf`;

	const model_client: modelClientType = {
		hero: model_hero,
		url: model_url,
		event: model_event,
		key: key
	};

	const stream = new Stream.PassThrough();
	stream.end(model.file);

	const bucket = getStorage(firebase).bucket();
	const model_ref = bucket.file(model_url);

	stream.pipe(model_ref.createWriteStream({
		metadata: {
		contentType: 'model/gltf+json'
		}
	}).on('finish', async () => {
		await getFirestore(firebase).collection('models').doc(model_hero + '_' + model_event + '_' + key).create(model_client);
	}));

	return 'creating...';
}

export {ModelCreate};
