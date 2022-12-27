import type {NextApiRequest, NextApiResponse} from 'next';
import {getStorage} from 'firebase-admin/storage';
import {firebase} from 'scripts/firebase';
import axios from 'axios';

const check = (arr: any[]) => arr.every(a => typeof a === 'string');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const hero = req.query.h;
	const event = req.query.e;
	const key = req.query.k;

	if (check([hero, event, key]) === false) {
		res.status(404).send('Query error');
		return;
	}

	const signedUrlOptions: any = {action: 'read', expires: new Date(Date.now() + 1000 * 60 * 30)};

	const model_path = `models/${hero}/${event + '_' + key}.gltf`;
	const model_url = await getStorage(firebase).bucket().file(model_path).getSignedUrl(signedUrlOptions);

	const model_file = await axios.get(model_url[0]);

	if (model_file.data) {
		return res.status(200).send(model_file.data);
	}
	
	return res.status(404).send('Not found');
}

export const config = {
	api: {
		responseLimit: false
  },
};
