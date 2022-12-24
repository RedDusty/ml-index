import ModelViewer from 'components/ModelViewer';
import {useRouter} from 'next/router';
import React from 'react';

const check = (arr: any[]) => arr.every(a => typeof a === 'string');

export default function Models() {
	const query = useRouter().query;

	if (check([query.h, query.e, query.k, query.v])) {
		const hero = query.h as string;
		const event = query.e as EventsNameType;
		const key = query.k as string;
		const version = Number(query.v);
		const url = `models/${hero}/${event}_${key}`;

		return (
			<div className='w-screen, h-screen'>
				<ModelViewer model={{hero, event, key, v: version, url}} />
			</div>
		);
	}

	return (
		<div>
			<p>query error</p>
		</div>
	);
}
