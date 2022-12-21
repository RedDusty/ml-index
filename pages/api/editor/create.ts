import type {NextApiRequest, NextApiResponse} from 'next';
import {AbilityCreate} from 'scripts/api/ability';
import {ModelCreate} from 'scripts/api/model';
import {promises} from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	console.log(req.socket.address());
	console.log(req.socket.localAddress);
	console.log(req.socket.remoteAddress);
	console.log(req.connection.remoteAddress);
	
	const editor = req.query.editor as editorType;

	if (typeof editor !== 'string') {
		res.status(404).send('editor wrong');
		return;
	}

	let redirect: string | undefined = undefined;

	switch (editor) {
		case 'model':
			const model = req.body as modelAPIType;
			redirect = await ModelCreate(model);
			break;
		case 'ability':
			const ability = req.body as abilityType;
			redirect = await AbilityCreate(ability);
			break;
	}

	if (typeof redirect !== 'string') {
		res.status(404).send('redirect error');
		return;
	}

	res.status(200).send(redirect);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};
