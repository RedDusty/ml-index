import EventIcon from 'components/utils/EventIcon';
import localforage from 'localforage';
import {InferGetStaticPropsType} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, {useContext} from 'react';
import {useRecoilState} from 'recoil';
import getModelsNames from 'scripts/api/models';
import cachedCheck from 'scripts/cachedCheck';
import {modelState} from 'scripts/state';

export default function Models({prop_models}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [models, setModels] = React.useState<modelsType[]>(prop_models);
	const [model, setModel] = useRecoilState(modelState);

	React.useEffect(() => {
		const fetchCachedModels = async () => {
			setModels(await cachedCheck(prop_models));
		};

		fetchCachedModels();
	}, [prop_models]);

	return (
		<div className='bg-blue-900 w-screen h-screen p-2'>
			<p className='text-2xl text-white font-semibold text-center'>Notes</p>
			<ul className='list-disc list-inside'>
				<li className='text-lg text-white mt-1 px-2'>
					To view models offline, first go to the page with this model. Wait for it to load and return to this page. After that, the name should be green
				</li>
			</ul>
			<p className='text-3xl text-white font-semibold text-center mt-4'>Models</p>
			<div className='flex flex-wrap justify-center items-start gap-4 mt-2 p-2'>
				{
					models.map((m, i) => {
						return (
							<Link
								href={{
									pathname: '/viewer', query: {
										h: m.hero,
										k: m.key
								}}}
								key={m.key + i}
								onClick={() => {
									setModel(m);
								}}
								className='relative hover:brightness-125'
							>
								<Image
									src={m.file ? m.image : (m.image || '/icons/hero_default.webp')}
									alt="" width={240} height={390}
									onError={e => e.currentTarget.src = '/icons/hero_default.webp'}
								/>
								<EventIcon event={m.event} />
								<div className='bg-gradient-to-t from-indigo-900 via-indigo-800 to-transparent h-16 absolute bottom-0 left-0 w-full'>
									<p className='absolute bottom-6 text-center w-full text-sky-400 font-normal'>{m.title}</p>
									<p className='absolute bottom-0 text-center w-full text-sky-400 font-normal'>
										{m.hero.charAt(0).toUpperCase() + m.hero.slice(1)}
									</p>
								</div>
								{m.file ? <p className='absolute top-2 left-2 bg-green-300 text-green-900 bg-opacity-75 p-1 rounded-md'>Offline</p> : <></>}
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
