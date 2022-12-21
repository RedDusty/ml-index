import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import React from 'react';
import getModelsNames from 'scripts/api/models';

export default function Models({models}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className='bg-blue-900 w-screen h-screen flex justify-start items-start gap-4 p-2'>
			{
				models.map((m, i) => {
					return (
						<Link
							href={{
								pathname: '/viewer', query: {
								m: m
								}
							}}
							key={m + i}
							className='rounded-md text-black bg-white hover:bg-sky-200 font-semibold p-2'
						>
							{(m.charAt(0).toUpperCase() + m.slice(1)).replace('_', ' ')}
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
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				models: [],
			},
		};
	}
}
