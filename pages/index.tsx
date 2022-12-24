import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import React from 'react';
import getModelsNames from 'scripts/api/models';

export default function Models({models}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className='bg-blue-900 w-screen h-screen flex flex-wrap justify-start items-start gap-4 p-2'>
			{
				models.map((m, i) => {
					return (
						<Link
							href={{
								pathname: '/viewer', query: {
									h: models[i].hero,
									e: models[i].event,
									k: models[i].key,
									v: models[i].v
								}
							}}
							key={m.key + i}
							className='rounded-md text-black bg-white hover:bg-sky-200 font-semibold p-2'
						>
							{(models[i].hero.charAt(0).toUpperCase() + models[i].hero.slice(1)) + ' ' + models[i].event}
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
