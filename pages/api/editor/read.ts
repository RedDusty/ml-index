import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises} from 'fs';

type ctype = keyof generalType;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const ctype = req.query.ctype as ctype;

	if (typeof ctype !== 'string') {
		res.status(404).send('ctype wrong');
		return;
	}

	const json_dir = path.join(process.cwd(), 'json');
	const public_dir = path.join(process.cwd(), 'public');
	let file: string | undefined = undefined;
	let json: generalType;

	switch (ctype) {
		case 'abilities':
		case 'events':
			file = await promises.readFile(json_dir + '/general.json', 'utf-8');
			break;
		default:
			break;
	}

	if (typeof file !== 'string') {
		res.status(404).send('file error');
		return;
	}

	json = JSON.parse(file);

	switch (ctype) {
		case 'events':
			for (let index = 0; index < json.events.length; index++) {
				const event = json.events[index];
				const icon_file = await promises.readFile(public_dir + '/icons/events/' + event.icon + '.webp', 'base64');
				event.icon = 'data:image/webp;base64,' + icon_file;
			}
		default:
			break;
	}

	res.status(200).json(json[ctype]);
}
