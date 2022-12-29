import {getStorage} from 'firebase-admin/storage';
import {getFirestore} from 'firebase-admin/firestore';
import {firebase} from 'scripts/firebase';
import {Stream} from 'stream';
import {nanoid} from 'nanoid';
import {storage_model_path, storage_portrait_path} from 'scripts/utils';

async function ModelCreate(model: modelAPIType) {
	const model_hero = model.hero;
	const model_event = model.event.toLowerCase().replace(' ', '_') as string;
	
	const key: string = nanoid(36);

	const model_url = storage_model_path(model_hero, key);
	const portrait_url = storage_portrait_path(model_hero, key);

	console.log(model_event);
	

	const model_client: modelType = {
		hero: model_hero,
		url: model_url,
		event: model_event,
		key: key,
		title: model.title,
		image: portrait_url,
		v: 1
	};

	const stream_model = new Stream.PassThrough();
	const stream_portrait = new Stream.PassThrough();
	stream_model.end(model.file);
	stream_portrait.end(Buffer.from(model.image, 'base64'));

	const bucket = getStorage(firebase).bucket();
	const model_ref = bucket.file(model_url);
	const portrait_ref = bucket.file(portrait_url);

	stream_portrait.pipe(portrait_ref.createWriteStream({
		metadata: {
			contentType: 'image/webp'
		}
	}));

	stream_model.pipe(model_ref.createWriteStream({
		metadata: {
			contentType: 'model/gltf+json'
		}
	}).on('finish', async () => {
		await getFirestore(firebase).collection('models').doc(key).create(model_client);
	}));

	return key;
}

export {ModelCreate};
