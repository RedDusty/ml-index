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

interface ListType {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	sel: propsDataType | string;
	bg?: string;
	data: propsDataType[] | string[];
	selectHandler: (v: propsDataType | string) => void;
	width?: number;
	height?: number;
	type: 'text' | 'icons' | 'all';
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
		{
			l.type === 'text' ?
				<ListText data={l.data} sel={sel} selectHandler={selectHandler} setShow={setShow}
					show={show} bg={l.bg} type={l.type} /> :
				<ListIcon data={l.data} sel={sel} selectHandler={selectHandler} setShow={setShow}
					show={show} bg={l.bg} height={l.height} width={l.width} type={l.type} />
		}
	</div>;
}

function ListText({setShow, show, sel, bg, data, selectHandler}: ListType) {
	return (
		<>
			<div
				onClick={() => setShow(!show)}
				className={'hover:bg-sky-300 px-2 py-1 ' + (show ? ' rounded-tl-md rounded-tr-md' : ' rounded-md')}>
				<p>
					{ typeof sel === 'string' ? sel.replace('_', ' ') : sel.name.replace('_', ' ') }
				</p>
			</div>
			<div className={(show ? 'flex' : 'hidden')
			+ ' absolute w-full max-h-36 overflow-y-auto flex-col '
			+ (show ? 'rounded-bl-md rounded-br-md ' : 'rounded-md ')
			+ (bg ?? 'bg-white')}>
			{
				typeof data[0] === 'string' ? 
					(data as string[]).filter(v => v !== sel).map((v, idx) => {
						return <div
						key={v + idx}
						onClick={() => selectHandler(v)}
							className='hover:bg-sky-300 w-full px-2 py-1'>
							<p>{v.replace('_', ' ')}</p>
					</div>;
					}) :
				(data as propsDataType[]).filter((v) => v.name !== (sel as propsDataType).name).map((v, idx) => {
					return <div
						key={v.name + idx}
						onClick={() => selectHandler(v)}
						className='hover:bg-sky-300 w-full px-2 py-1'>
						<p>{v.name.replace('_', ' ')}</p>
					</div>;
				})
			}
			</div>
		</>
	);
}

function ListIcon({data, sel, selectHandler, setShow, show, bg, height, width, type}: ListType) {
	return (
		<>
			<div
				onClick={() => setShow(!show)}
				className={'hover:bg-sky-300 px-2 py-1 ' + (show ? ' rounded-tl-md rounded-tr-md' : ' rounded-md')}>
				{typeof sel === 'string' ? sel.replace('_', ' ') :
					<>
						{sel.icon ? 
							<Image 
								src={sel.icon ?? ''} alt={sel.name} 
								width={width ?? 90} height={height ?? 40} /> : <></>
						}
						{
							type === 'icons' && sel.icon !== undefined ? <></> : 
							<p>
								{sel.name.replace('_', ' ')}
							</p>
						}
					</>
				}
			</div>
			<div className={(show ? 'flex' : 'hidden')
			+ ' absolute w-full max-h-36 overflow-y-auto flex-col '
			+ (show ? 'rounded-bl-md rounded-br-md ' : 'rounded-md ')
			+ (bg ?? 'bg-white')}>
			{
				typeof data[0] === 'string' ? 
					(data as string[]).filter(v => v !== sel).map((v, idx) => {
						return <div
						key={v + idx}
						onClick={() => selectHandler(v)}
						className='hover:bg-sky-300 w-full px-2 py-1'>
							<p>{v.replace('_', ' ')}</p>
					</div>;
					}) :
				(data as propsDataType[]).filter((v) => v.name !== (sel as propsDataType).name).map((v, idx) => {
					return <div
						key={v.name + idx}
						onClick={() => selectHandler(v)}
						className='hover:bg-sky-300 w-full px-2 py-1'>
						{v.icon ? 
								<Image 
									src={v.icon ?? ''} alt={v.name} 
									width={width ?? 90} height={height ?? 40} /> : <></>
							}
							{
								type === 'icons' && v.icon !== undefined ? <></> : 
								<p>
									{v.name.replace('_', ' ')}
								</p>
							}
					</div>;
				})
			}
			</div>
		</>
	);
}
