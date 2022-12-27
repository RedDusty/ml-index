import Link from 'next/link';
import React, {useState} from 'react';
import {Animate, AnimateCancel, Viewer} from 'scripts/viewer';

export default function ModelViewer({model}: {model: modelType | string}) {
	const threeRef = React.useRef<HTMLDivElement>(null);
	const [state, setState] = useState<viewerStateType>('loading');

	React.useEffect(() => {
		const createViewer = async () => {
			if (threeRef && threeRef.current) {
				const viewerState = await Viewer(threeRef.current, model);
				setState(viewerState);
			}
		};
		if (threeRef && threeRef.current) {
			createViewer();
			Animate();
			return () => {
				AnimateCancel();
			};
		}
	}, [threeRef, model]);

	return <div className="w-full h-full flex justify-center items-center">
		<div ref={threeRef} className="w-screen h-screen fixed z-[1]"></div>
		<Link href='/' className='z-[3] fixed bg-sky-100 hover:bg-sky-200 text-sky-900 hover:text-sky-800 px-4 py-2 font-semibold top-2 left-2 rounded-md'>Home</Link>
		{
			state === 'loading' ? <div className='fixed bg-sky-100 text-sky-800 p-16 rounded-md font-semibold text-xl text-center z-[2]'>Loading model...</div> : <></>
		}
		{
			state === 'done' || state === 'loading' ? <></> : <ErrorWindow state={state} />
		}
	</div>;
}

function ErrorWindow({state}: {state: viewerStateType}) {
	return <div className='fixed bg-red-100 p-16 rounded-md font-semibold text-xl text-center z-[2]'>
		<p className='text-red-900'>
			{state === 'error' ? 'An unknown error has occurred': ''}
			{state === 'not_found' ? 'This model does not exist': ''}
			{state === 'no_cache' ? 'Offline. This model is not loaded': ''}
		</p>
		{state === 'no_cache' ? <p className='text-lg mt-4 text-red-700'>Load it when internet is available</p>: ''}
	</div>;
}
