import Image from 'next/image';
import React from 'react';

type propsDataType = {
	name: string;
	icon?: string;
}

type props = {
	type: 'text' | 'icons' | 'all';
	width?: number;
	height?: number;
	data: propsDataType[] | string[];
	bg?: string;
	callback: React.Dispatch<React.SetStateAction<any>>;
}

export default function List(l: props) {
	const [sel, setSel] = React.useState(l.data[0]);
	const [show, setShow] = React.useState(false);

	const selectHandler = (v: propsDataType | string) => {
		setSel(v);
		setShow(false);
		l.callback(v);
	};

	return <div
		className={'relative w-full h-full cursor-pointer '
			+ (l.bg ?? 'bg-white')
			+ (show ? ' rounded-tl-md rounded-tr-md' : ' rounded-md')}>
		<div
			onClick={() => setShow(!show)}
			className={'hover:bg-sky-300 px-2 py-1 ' + (show ? ' rounded-tl-md rounded-tr-md' : ' rounded-md')}>
			{
				typeof sel === 'string' ? <p>{sel}</p> : 
					<>
						<Image 
							src={sel.icon ?? ''} alt={sel.name} 
							width={l.width ?? 90} height={l.height ?? 40} />
						{l.type !== 'icons' ? <p>{sel.name.replace('_', ' ')}</p> : <></>}
					</>
			}
		</div>
		<div className={(show ? 'flex' : 'hidden')
			+ ' absolute w-full max-h-36 overflow-y-auto flex-col '
			+ (show ? 'rounded-bl-md rounded-br-md ' : 'rounded-md ')
			+ (l.bg ?? 'bg-white')}>
			{
				typeof l.data[0] === 'string' ? 
					(l.data as string[]).filter(v => v !== sel).map((v, idx) => {
						return <div
						key={v + idx}
						onClick={() => selectHandler(v)}
							className='hover:bg-sky-300 w-full px-2 py-1'>
							<p>{v.replace('_', ' ')}</p>
					</div>;
					}) :
				(l.data as propsDataType[]).filter((v) => v.name !== (sel as propsDataType).name).map((v, idx) => {
					return <div
						key={v.name + idx}
						onClick={() => selectHandler(v)}
						className='hover:bg-sky-300 w-full px-2 py-1'>
						<Image 
							src={v.icon ?? ''} alt={v.name} 
							width={l.width ?? 90} height={l.height ?? 40} />
						{l.type !== 'icons' ? <p>{v.name.replace('_', ' ')}</p> : <></>}
					</div>;
				})
			}
		</div>
	</div>;
}
