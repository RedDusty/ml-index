import axios from 'axios';
import ModelViewer from 'components/ModelViewer';
import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import getModelsNames from 'scripts/api/models';

export default function Models() {
	const query = useRouter().query;

	if (typeof query.h === 'string' && typeof query.s === 'string' && typeof query.k === 'string') {
		const hero = query.h;
		const skin = query.s as EventsNameType;
		const key = query.k;

		return (
			<div className='w-screen, h-screen'>
				<ModelViewer model={{hero, skin, key}} />
			</div>
		);
	}

	return (
		<div>
			<p>query error</p>
		</div>
	);
}
