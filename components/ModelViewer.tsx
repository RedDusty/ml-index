import React, {useState} from 'react';
import {Animate, AnimateCancel, Viewer} from 'scripts/viewer';

export default function ModelViewer({model, h, k}: {model?: modelsType, h?: string, k?: string}) {
	const threeRef = React.useRef<HTMLDivElement>(null);
	const [state, setState] = useState<viewerStateType>('loading');
	const [optState, setOptState] = useState<string | null>('Loading 3d scene...');
	
	React.useEffect(() => {
		if (threeRef && threeRef.current && (model || (h && k))) {
			Viewer({div: threeRef.current, model, setOptState, setState, h, k});

			Animate();
			
			return () => {
				AnimateCancel();
			};
		}
	}, [threeRef, model, h, k]);

	return <div className="w-full h-full flex justify-center items-center">
		<div ref={threeRef} className="w-screen h-screen fixed z-[1]"></div>
		{
			state === 'loading' ? <Window opt={optState} /> : <></>
		}
		{
			state === 'done' || state === 'loading' ? <></> : <ErrorWindow state={state} opt={optState}/>
		}
	</div>;
}

function Window({opt}: { opt: string | null }) {
	return <div className='fixed bg-sky-200 p-16 rounded-md z-[2] flex flex-col gap-4'>
		<p className='text-sky-800 font-semibold text-xl text-center'>Loading model...</p>
		{opt ? <p className='text-sky-700 font-semibold text-lg text-center'>{opt}</p> : <></>}
	</div>;
}

function ErrorWindow({state, opt}: {state: viewerStateType, opt: string | null}) {
	return <div className='fixed bg-red-100 p-16 rounded-md z-[2] flex flex-col gap-4'>
		<p className='text-red-900 font-semibold text-xl text-center'>
			{state === 'error' ? 'An unknown error has occurred': ''}
			{state === 'not_found' ? 'This model does not exist': ''}
			{state === 'no_cache' ? 'Offline. This model is not loaded': ''}
		</p>
		{opt ? <p className='text-red-700 font-semibold text-lg text-center'>{opt}</p> : <></>}
	</div>;
}
