import type {NextApiRequest, NextApiResponse} from 'next';
import {getStorage} from 'firebase-admin/storage';
import {firebase} from 'scripts/firebase';
import axios from 'axios';
import {signed_url_options, storage_model_path} from 'scripts/utils';

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

	const model_path = storage_model_path(hero as string, key as string);
	const model_url = await getStorage(firebase).bucket().file(model_path).getSignedUrl(signed_url_options);

	const model_file = await axios.get(model_url[0]);

	if (model_file.config.url) {
		return res.status(200).send(model_file.config.url);
	}
	
	return res.status(404).send('Not found');
}

export const config = {
	api: {
		responseLimit: false
  },
};
