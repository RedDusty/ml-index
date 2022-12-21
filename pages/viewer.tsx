import axios from 'axios';
import ModelViewer from 'components/ModelViewer';
import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import getModelsNames from 'scripts/api/models';

export default function Models() {
	const query = useRouter().query;

	if (query.m && typeof query.m === 'string' ) {
		const hero = query.m.split('_')[0];
		const skin = query.m.split('_')[1] as EventsNameType;

		return (
			<div className='w-screen, h-screen'>
				<ModelViewer model={{hero, skin}} />
			</div>
		);
	}

	return (
		<div>
			<p>query error</p>
		</div>
	);
}
