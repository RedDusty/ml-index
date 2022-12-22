import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import React from 'react';
import getModelsNames from 'scripts/api/models';

export default function Models({models}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className='bg-blue-900 w-screen h-screen flex flex-wrap justify-start items-start gap-4 p-2'>
			{
				models.map((m, i) => {
					const model = m.split('_');
					return (
						<Link
							href={{
								pathname: '/viewer', query: {
									h: model[0],
									s: model[1],
									k: model[2]
								}
							}}
							key={m + i}
							className='rounded-md text-black bg-white hover:bg-sky-200 font-semibold p-2'
						>
							{(model[0].charAt(0).toUpperCase() + model[0].slice(1)) + ' ' + model[1] + ' ' + i}
						</Link>
					);
				})
			}
		</div>
	);
}

export async function getStaticProps() {
	try {
		const models = await getModelsNames();
		return {
			props: {
				models: models,
			},
			revalidate: 60
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				models: [],
			},
			revalidate: 60
		};
	}
}
