import axios from 'axios';
import List from 'components/utils/List';
import React from 'react';

interface modelAPIStateType extends Omit<modelAPIType, 'file'> {
	file: string | null;
}

const modelInit: modelAPIStateType = {
	hero: 'hero_name',
	event: 'default',
	image: '',
	title: '',
	file: null
};

export default function EditorModel() {
	const [model, setModel] = React.useState<modelAPIStateType>(modelInit);
	const [events, setEvents] = React.useState<generalEventType[]>([]);

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
					modelEventHanlder(events[0]);
				}
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchData();
		return () => {
			source.cancel();
		};
	}, [model.file, model.image]);

	const modelEventHanlder = (v: any) => {
		setModel((prev) => {
			return {
				...prev, event: v.name
			};
		});
	};

	const modelLoad = (f: File | null) => {
		if (f) {
			const url = URL.createObjectURL(f);
			setModel((prev) => {
				return {
					...prev, file: url
				};
			});
		}
	};

	const modelImageLoad = (f: File | null) => {
		if (f) {
			const url = URL.createObjectURL(f);
			setModel((prev) => {
				return {
					...prev, image: url
				};
			});
		}
	};

	const modelHeroHandler = (v: string) => {
		setModel((prev) => {
			return {
				...prev, hero: v
			};
		});
	};

	const modelTitleHandler = (v: string) => {
		setModel((prev) => {
			return {
				...prev, title: v
			};
		});
	};

	const modelCreate = async () => {
		if (model.file) {
			const file = await fetch(model.file).then(r => r.blob());
			const image = await fetch(model.image).then(r => r.blob());
			const buffer = await image.arrayBuffer();
			
			axios.post('api/editor/create', {
				hero: model.hero,
				event: model.event,
				file: await file.text(),
				image: Buffer.from(buffer).toString('base64'),
				title: model.title
			} as modelAPIStateType, {
				params: {
					editor: 'model'
				}
			});
		}
	};

	const modelClear = () => {
		if (model.file) URL.revokeObjectURL(model.file);
		if (model.image) URL.revokeObjectURL(model.image);
		setModel({event: 'default', file: null, hero: '', image: '', title: ''});
	};

	return (
		<>
			<div className='w-full flex justify-center items-center gap-x-4'>
				<button className='bg-white hover:bg-green-300 hover:text-green-900 font-semibold p-2 rounded-md' onClick={modelClear}>Clear</button>
					<h1 className='text-white font-bold text-2xl text-center py-4'>
						Model editor
					</h1>
				<button className='bg-white hover:bg-green-300 hover:text-green-900 font-semibold p-2 rounded-md' onClick={modelCreate}>Create</button>
			</div>
			<div>
				<input type="file" name="" id="" onChange={(e) => modelLoad(e.currentTarget.files ? e.currentTarget.files[0] : null)} />
				<input type="file" name="" id="" onChange={(e) => modelImageLoad(e.currentTarget.files ? e.currentTarget.files[0] : null)} />
				{model.image.length ? <img src={model.image} alt="" /> : <></>}
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-fit'>
					<label htmlFor="aName" className='font-semibold'>Name</label>
					<input
						type="text"
						id="aName"
						className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
						value={model.hero}
						onChange={(e) => modelHeroHandler(e.currentTarget.value)} />
				</div>
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-fit'>
					<label htmlFor="aTitle" className='font-semibold'>Title</label>
					<input
						type="text"
						id="aTitle"
						className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
						value={model.title}
						onChange={(e) => modelTitleHandler(e.currentTarget.value)} />
				</div>
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-36 h-16'>
					{events.length ? <List type='icons' data={events} width={144} height={64} callback={modelEventHanlder} /> : <></>}
				</div>
			</div>
		</>
	);
}
