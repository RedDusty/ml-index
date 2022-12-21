import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {createReadStream, createWriteStream, promises, rmSync} from 'fs';

import archiver from 'archiver';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	await promises.mkdir(path.join(process.cwd(), 'json'), {recursive: true});
	await promises.mkdir(path.join(process.cwd(), 'models'), {recursive: true});
	const models_dir = path.join(process.cwd(), 'models');
	const json_dir = path.join(process.cwd(), 'json');
	
	await promises.mkdir(process.cwd() + '/temp', {recursive: true});
	rmSync(process.cwd() + '/temp', {recursive: true, force: true});
	const archive = archiver('zip');

	const output = createWriteStream(process.cwd() + '/temp/output.zip');

	archive.pipe(output);
	archive.directory(json_dir, 'json', {date: new Date()});
	archive.directory(models_dir, 'models', {date: new Date()});
	await archive.finalize();

	output.on('close', function () {
		console.log('output.zip: ' + archive.pointer() + ' total bytes');
	});

	res.writeHead(200, {
		'Content-Type': 'application/zip',
		'Content-disposition': 'attachment; filename=output.zip',
		'Conent-Length': archive.pointer()
	});
	
	const readStream = createReadStream(process.cwd() + '/temp/output.zip');
	readStream.pipe(res);
}
