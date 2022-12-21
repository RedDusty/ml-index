import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {promises} from 'fs';
import getModelsNames from 'scripts/api/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const models = await getModelsNames();

	res.status(200).json(models);
}
