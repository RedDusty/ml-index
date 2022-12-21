import axios from 'axios';
import List from 'components/utils/List';
import Image from 'next/image';
import React from 'react';

type props = {
	setAbility: React.Dispatch<React.SetStateAction<abilityType>>;
	event_icons: abilityEventIconsType[];
}

export default function EditorAbilityIcons({setAbility, event_icons}: props) {
	const [icon, setIcon] = React.useState<string | null>(null);
	const [eicon, setEIcon] = React.useState<string | null>(null);
	const [events, setEvents] = React.useState<generalEventType[]>([]);
	const [event, setEvent] = React.useState<generalEventType | null>(null);

	React.useEffect(() => {
		const source = axios.CancelToken.source();

		async function fetchData() {
			try {
				const res = await axios.get('api/editor/read', {
					cancelToken: source.token,
					params: {
						ctype: 'events'
					}
				});
				if (res.data) {
					const events = res.data as generalEventType[];
	
					setEvents(events ?? []);
					setEvent(events[0]);
				}
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchData();
		return () => {
			source.cancel();
		};
	}, []);

	const iconHandler = (f: File) => {
		if (!f) return;

		const reader = new FileReader();
		reader.readAsDataURL(f);
		
		reader.onloadend = (e) => {
			if (reader.result instanceof ArrayBuffer) {
				const buf_icon = Buffer.from(reader.result).toString('base64');
				setIcon(buf_icon);
				setAbility((prev) => {
					return {...prev, icon: buf_icon};
				});
			} else if (reader.result) {
				const buf_icon = reader.result;
				setIcon(buf_icon);
				setAbility((prev) => {
					return {...prev, icon: buf_icon};
				});
			}
		};
	};

	const removeIconHandler = () => {
		setIcon(null);
		setAbility((prev) => {
			return {
				...prev, icon: ''
			};
		});
	};

	const eventIconHanlder = (f: File) => {
		if (!f) return;

		const reader = new FileReader();
		reader.readAsDataURL(f);
		
		reader.onloadend = (e) => {
			if (reader.result instanceof ArrayBuffer) {
				setEIcon(Buffer.from(reader.result).toString('base64'));
			} else if (reader.result) {
				setEIcon(reader.result);
			}
		};
	};

	const eventIconAddHandler = () => {
		if (event && eicon) {
			const event_icon: abilityEventIconsType = {name: event.name, icon: eicon, event_icon: event.icon!};
			setAbility((prev) => {
				return {
					...prev,
					event_icons: prev.event_icons.concat(event_icon)
				};
			});
		}
	};

	const eventIconClearHandler = () => setEIcon(null);

	const eventIconRemoveHandler = (i: number) => {
		setAbility((prev) => {
			const event_icon = prev.event_icons[i];
			setEIcon(event_icon.icon);
			setEvent({
				name: event_icon.name,
				icon: event_icon.event_icon
			});
			return {
				...prev,
				event_icons: prev.event_icons.filter((el, idx) => prev.event_icons.some(() => idx !== i))
			};
		});
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-4'>
				{
					icon ?
						<div className='w-36 h-36 bg-white rounded-[128px] flex justify-center items-center'>
							<Image
								className='rounded-full w-32 h-32'
								src={icon}
								alt="Preview not available"
								width={128} height={128} />
						</div> : 
						<div className='w-36 h-36 bg-white rounded-[128px] hover:bg-sky-300 hover:rounded-lg duration-150'>
							<label htmlFor="icon" className='w-full h-full flex flex-col items-center justify-center text-center'>
								<span>Drop or choose</span>
								<span>an image.</span>
								<span>webp/gif only</span>
							</label>
						</div>
				}
				{
					icon ? 
					<button
						className='bg-white hover:bg-red-300 hover:text-red-900 rounded-md h-fit p-2 font-semibold'
						onClick={removeIconHandler}
					>
						Remove icon
					</button> : <></>
				}
				<input accept='image/webp, image/gif' type="file" id="icon" className='hidden' onChange={(e) => iconHandler(e.currentTarget.files![0])} />
			</div>
			<div
				className={'bg-white hover:bg-sky-100 group rounded-md p-2 flex-col ' +
					(event_icons.length === 0 ? 'hidden' : 'flex')}>
				<table>
					<tbody>
						{event_icons.map((e, idx) => {
							return <tr key={e.name + idx} className="w-full">
								<td className='capitalize font-semibold w-1/3 border border-solid border-zinc-300 text-center'>{e.name.replace('_', ' ')}</td>
								<td className='w-36 border border-solid border-zinc-300 text-left'>
									<Image className='w-36 h-16' src={e.event_icon} width={144} height={64} alt={e.name} />
								</td>
								<td className='w-20 border border-solid border-zinc-300 text-left p-2'>
									<Image className='rounded-full w-16 h-16' src={e.icon} width={64} height={64} alt={e.name} />
								</td>
								<td
									className='w-1/5 border border-solid border-zinc-300 font-semibold cursor-pointer hover:bg-red-300 hover:text-red-900 text-center'
									onClick={() => eventIconRemoveHandler(idx)}>
									Remove
								</td>
							</tr>;
						})}
					</tbody>
				</table>
			</div>
			<div className='flex gap-2 flex-wrap'>
				<div className='w-36 h-16'>
					{events.length ?
						<List type='icons' data={events} width={144} height={64} callback={setIcon} />
						: <></>}
				</div>
				{
					eicon ?
						<div className='w-20 h-20 bg-white rounded-[128px] flex justify-center items-center'>
							<Image
								className='rounded-full w-16 h-16'
								src={eicon}
								alt="Preview not available"
								width={64} height={64} />
						</div> : 
						<div className='w-20 h-20 bg-white rounded-[64px] hover:bg-sky-300 hover:rounded-lg duration-150'>
							<label htmlFor="eicon" className='w-full h-full flex flex-col items-center justify-center text-center'>
								<span>webp</span>
								<span>gif</span>
							</label>
						</div>
					}
				<div className='flex flex-wrap items-center gap-4'>
					{
						eicon ? <div className='flex flex-wrap gap-2'>
							<button
								className='bg-white hover:bg-red-300 hover:text-red-900 rounded-md h-fit p-2 font-semibold'
								onClick={eventIconClearHandler}
							>
								Clear event icon
							</button>
							<button
								className='bg-white hover:bg-green-300 hover:text-green-900 rounded-md h-fit p-2 font-semibold'
								onClick={eventIconAddHandler}
							>
								Add event icon
							</button>
						</div> : <></>
					}
					<input accept='image/webp, image/gif' type="file" id="eicon" className='hidden' onChange={(e) => eventIconHanlder(e.currentTarget.files![0])} />
				</div>
			</div>
		</div>
	);
}
