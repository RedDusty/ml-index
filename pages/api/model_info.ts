import type {NextApiRequest, NextApiResponse} from 'next';
import {getStorage} from 'firebase-admin/storage';
import {firebase} from 'scripts/firebase';
import {signed_url_options, storage_portrait_path} from 'scripts/utils';
import {getFirestore} from 'firebase-admin/firestore';

const check = (arr: any[]) => arr.every(a => typeof a === 'string');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const hero = req.query.h;
	const key = req.query.k;

	if (check([hero, key]) === false) {
		res.status(404).send('Query error');
		return;
	}
	const model_doc = await getFirestore(firebase).collection('models').doc(key as string).get();
	const model_info = model_doc.data() as modelType;

	const portrait = await getStorage(firebase).bucket().file(storage_portrait_path(hero as string, key as string)).getSignedUrl(signed_url_options);

	model_info.image = portrait[0];

	if (model_info) {
		return res.status(200).send(model_info);
	}
	
	return res.status(404).send('Not found');
}

export const config = {
	api: {
		responseLimit: false
  },
};
