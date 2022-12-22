import type {NextApiRequest, NextApiResponse} from 'next';
import {getStorage} from 'firebase-admin/storage';
import {firebase} from 'scripts/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const hero = req.query.h;
	const skin = req.query.s;
	const key = req.query.k;

	if (typeof hero !== 'string' && typeof skin !== 'string' && typeof key !== 'string') {
		res.status(404).send('Query error');
		return;
	}

	const signedUrlOptions: any = {action: 'read', expires: new Date(Date.now() + 1000 * 60 * 30)};

	const model_url = `models/${hero}/${skin + '_' + key}.gltf`;
	const model_file = await getStorage(firebase).bucket().file(model_url).getSignedUrl(signedUrlOptions);

	res.status(200).send(model_file[0]);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
