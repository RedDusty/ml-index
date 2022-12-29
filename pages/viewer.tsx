import ModelViewer from 'components/ModelViewer';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import {useRecoilState} from 'recoil';
import {modelState} from 'scripts/state';

export default function Models() {
	const query = useRouter().query;
	const [model] = useRecoilState(modelState);

	if (model || (typeof query.h === 'string' && typeof query.k === 'string')) {
		return (
			<div className='w-screen, h-screen'>
			<Link 
				href='/' 
				className='z-[3] fixed bg-sky-100 hover:bg-sky-200 text-sky-900 hover:text-sky-800 px-4 py-2 font-semibold top-2 left-2 rounded-md'>
					Home
			</Link>
				<ModelViewer model={model as modelsType} h={query.h as string} k={query.k as string} />
			</div>
		);
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<Link 
				href='/' 
				className='z-[3] fixed bg-sky-100 hover:bg-sky-200 text-sky-900 hover:text-sky-800 px-4 py-2 font-semibold top-2 left-2 rounded-md'>
					Home
			</Link>
			<div className='fixed bg-red-100 p-16 rounded-md text-red-900 font-semibold text-xl text-center z-[2]'>
				Model not selected
			</div>
		</div>
	);
}
