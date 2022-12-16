import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import {createReadStream, createWriteStream, promises, rmSync} from 'fs';

import archiver from 'archiver';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const json_dir = path.join(process.cwd(), 'json');
	const public_dir = path.join(process.cwd(), 'public');
	
	rmSync(process.cwd() + '/temp', {recursive: true});
	await promises.mkdir(process.cwd() + '/temp', {recursive: true});
	
	const output_json = createWriteStream(process.cwd() + '/temp/output_json.zip');
	const archive = archiver('zip');

	archive.pipe(output_json);
	archive.directory(json_dir, false);
	await archive.finalize();

	output_json.on('close', function () {
		console.log('output_json.zip: ' + archive.pointer() + ' total bytes');
	});

	const output_icons = createWriteStream(process.cwd() + '/temp/output_icons.zip');

	archive.pipe(output_icons);
	archive.directory(public_dir + '/icons', false);
	await archive.finalize();

	output_icons.on('close', function () {
		console.log('output_icons.zip: ' + archive.pointer() + ' total bytes');
	});

	const output_all = createWriteStream(process.cwd() + '/temp/output.zip');

	archive.pipe(output_all);
	archive.directory(process.cwd + '/temp', false);
	await archive.finalize();

	output_all.on('close', function () {
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
