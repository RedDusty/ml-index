import Image from 'next/image';
import {useState} from 'react';

export default function EventIcon({event}: {event: string}) {
	const [isError, setError] = useState(false);

	if (isError) {
		return (
			<p className='absolute right-2 top-2 bg-sky-300 text-sky-900 bg-opacity-75 p-1 rounded-md'>
		{		event.charAt(0).toUpperCase() + event.slice(1).replaceAll('_', ' ')}
			</p>
		);
	}

	return <Image src={'/icons/events/' + event.charAt(0).toUpperCase() + event.slice(1) + '.webp'} width={90} height={40} alt='' className='absolute right-2 top-2' onError={() => setError(true)} />; 
}
