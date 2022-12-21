import axios from 'axios';
import ModelViewer from 'components/ModelViewer';
import List from 'components/utils/List';
import React from 'react';

interface modelAPIStateType extends Omit<modelAPIType, 'file'> {
	file: string | null;
}

const modelInit: modelAPIStateType = {
	hero: 'hero_name',
	event: 'default',
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
					modelEventHanlder(events[0].name);
				}
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchData();
		return () => {
			if (model.file) URL.revokeObjectURL(model.file);
			source.cancel();
		};
	}, [model.file]);

	const modelEventHanlder = (v: EventsNameType) => {
		setModel((prev) => {
			return {
				...prev, event: v
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

	const modelHeroHandler = (v: string) => {
		setModel((prev) => {
			return {
				...prev, hero: v.toLowerCase().replace(' ', '_')
			};
		});
	};

	const modelCreate = async () => {
		if (model.file) {
			const file = await fetch(model.file).then(r => r.blob());
			axios.post('api/editor/create', {
				hero: model.hero,
				event: model.event,
				file: await file.text()
			}, {
				params: {
					editor: 'model'
				}
			});
		}
	};

	return (
		<>
			<div className='w-full flex justify-center items-center gap-x-4'>
					<h1 className='text-white font-bold text-2xl text-center py-4'>
						Model editor
					</h1>
				<button className='bg-white hover:bg-green-300 hover:text-green-900 font-semibold p-2 rounded-md' onClick={modelCreate}>Create</button>
			</div>
			<div>
				<p>{model.file ? model.file : 'Waiting...'}</p>
				{
					model.file ?
						<ModelViewer model={model.file} /> :
						<input type="file" name="" id="" onChange={(e) => modelLoad(e.currentTarget.files ? e.currentTarget.files[0] : null)} />
				}
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-fit'>
					<label htmlFor="aName" className='font-semibold'>Name</label>
					<input
						type="text"
						id="aName"
						className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
						value={model.hero}
						onChange={(e) => modelHeroHandler(e.currentTarget.value)} />
				</div>
				<div className='bg-white hover:bg-sky-100 group rounded-md p-2 w-36 h-16'>
					{events.length ? <List type='icons' data={events} width={144} height={64} callback={modelEventHanlder} /> : <></>}
				</div>
			</div>
		</>
	);
}
