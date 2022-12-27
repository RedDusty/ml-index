import Link from 'next/link';
import {ChangeEvent, useEffect, useState} from 'react';

export default function Offline() {
	const [line, setLine] = useState(false);
	const [reloadOnOnline, setReloadOnOnline] = useState(false);
	const [isDefaultURL, setDefaultURL] = useState(false);
	
	useEffect(() => {
		setDefaultURL(location.pathname === '/_offline');

		const onlineHandler = () => {
			setLine(navigator.onLine);
			if (navigator.onLine) {
				if (location.pathname === '/_offline') return;
				reloadHandler();
			}
		};
		onlineHandler();
		const lsroo = localStorage.getItem('reloadOnOnline');
		if (lsroo) setReloadOnOnline(Boolean(lsroo));

		window.ononline = () => onlineHandler();
		window.onoffline = () => onlineHandler();

	}, []);

	const reloadHandler = () => {
		window.location.reload();
	};

	const reloadOnOnlineHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setReloadOnOnline(e.target.checked || false);
		localStorage.setItem('reloadOnOnline', String(e.target.checked));
	};

	return (
		<div className={'bg-blue-900 w-screen h-screen flex flex-col justify-center items-center gap-8'}>
			<p className='text-white font-semibold text-4xl text-center mt-2'>
				You are currently {line ? <span className='text-green-300'>online</span> : <span className='text-red-300'>offline</span>}
			</p>
			{isDefaultURL === false ? <p className='text-white text-xl text-center px-2'>Next time visit this page when you have internet to watch it offline</p> : <></>}
			{line && reloadOnOnline && isDefaultURL === false ? <p className='text-white text-xl text-center mt-2'>Reloading page...</p> : <></>}
			{line && reloadOnOnline === false && isDefaultURL === false ? <p className='text-white text-xl text-center mt-2'>Please reload the page to see it</p> : <></>}
			{isDefaultURL ? <p className='text-white text-xl text-center px-2'>It looks like you have reached the standard page that is shown when there is no Internet</p> : <></>}
			{isDefaultURL && reloadOnOnline ? <p className='text-white text-xl text-center px-2'>Automatic page reload is disabled for this page only to avoid endless reloads</p> : <></>}
			<div className='flex flex-wrap items-center justify-center gap-4'>
				<button
						className={'p-2 rounded-md font-semibold '
							+ (line ? 'bg-green-200 hover:bg-green-300 text-green-900' : 'bg-red-200 hover:bg-red-300 text-red-900')
						}
					onClick={reloadHandler}>
					Reload
				</button>
				<Link href={'/'} className='bg-sky-200 hover:bg-sky-300 text-sky-900 p-2 rounded-md font-semibold'>Home</Link>
				<div className='bg-white bg-opacity-25 p-2 rounded-md flex gap-2'>
					<label htmlFor="reloadOnOnline" className='text-white'>Always reload on online</label>
					<input type="checkbox" id="reloadOnOnline" checked={reloadOnOnline} onChange={reloadOnOnlineHandler} />
				</div>
			</div>
		</div>
	);
}
