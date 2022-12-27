import localforage from 'localforage';
import {InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import React from 'react';
import getModelsNames from 'scripts/api/models';
import cachedCheck from 'scripts/cachedCheck';

export default function Models({prop_models}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [models, setModels] = React.useState<modelsType[]>(prop_models);

	React.useEffect(() => {
		const fetchCachedModels = async () => {
			setModels(await cachedCheck(prop_models));
		};

		fetchCachedModels();
	}, [prop_models]);

	return (
		<div className='bg-blue-900 w-screen h-screen p-2'>
			<p className='text-3xl text-white font-semibold text-center'>Meanings</p>
			<div className='p-2'>
				<div className='flex flex-wrap gap-2'>
					<div className='w-32 h-10 p-2 text-center bg-white rounded-md text-black font-semibold'>Only online</div>
					<div className='w-32 h-10 p-2 text-center bg-green-200 rounded-md text-green-900 font-semibold'>Online/Offline</div>
				</div>
			</div>
			<p className='text-2xl text-white font-semibold text-center'>Notes</p>
			<ul className='list-disc list-inside'>
				<li className='text-lg text-white mt-1 px-2'>
					To view models offline, first go to the page with this model. Wait for it to load and return to this page. After that, the name should be green
				</li>
				<li className='text-lg text-white mt-1 px-2'>
					Some models may turn back white, which means that it has been updated. You need to download it again.
				</li>
			</ul>
			<p className='text-3xl text-white font-semibold text-center mt-4'>Models</p>
			<div className='flex flex-wrap justify-start items-start gap-4 mt-2 p-2'>
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
								className={'rounded-md text-black font-semibold p-2 h-10 ' +
									(models[i].file ? 'bg-green-200 hover:bg-green-300 text-green-900' : 'bg-white hover:bg-sky-200 text-black')}
							>
								{(models[i].hero.charAt(0).toUpperCase() + models[i].hero.slice(1)) + ' ' + models[i].event}
							</Link>
						);
					})
				}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	try {
		const models = await getModelsNames();
		return {
			props: {
				prop_models: models,
			},
			revalidate: 60
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				prop_models: [],
			},
			revalidate: 60
		};
	}
}
