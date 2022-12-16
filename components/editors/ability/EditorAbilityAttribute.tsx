import React from 'react';

type props = {
	setAbility: React.Dispatch<React.SetStateAction<abilityType>>;
	attributes: abilityAttributeType[];
}

export default function EditorAbilityAttribute({setAbility, attributes}: props) {
	const [attributeName, setAttributeName] = React.useState<string>('name');
	const [attributeValue, setAttributeValue] = React.useState<string>('0');

	const addAttributeHandler = () => {
		setAbility((prev) => {
			const aname = attributeName;
			const avalue = attributeValue.split(' ').map((v) => Number(v));
			const attribute = {
				name: aname,
				value: avalue.length === 1 ? avalue[0] : avalue
			};
			setAttributeName('');
			return {
				...prev,
				attributes: prev.attributes.concat(attribute)
			};
		});
	};

	const attributeRemoveHandler = (i: number) => {
		setAbility((prev) => {
			const attrib = prev.attributes[i];
			setAttributeName(attrib.name);
			setAttributeValue(Array.isArray(attrib.value) ? attrib.value.join(' ') : String(attrib.value));
			return {
				...prev,
				attributes: prev.attributes.filter((el, idx) => prev.attributes.some(() => idx !== i))
			};
		});
	};

	return (
		<>
		<div
			className={'bg-white hover:bg-sky-100 group rounded-md p-2 flex-col ' +
				(attributes.length === 0 ? 'hidden' : 'flex')}>
			<table>
				<tbody>
					{attributes.map((a, idx) => {
						return <tr key={a.name + idx} className="w-full">
							<td className='capitalize font-semibold w-1/3 pr-1 border border-solid border-zinc-300 text-right'>{a.name}</td>
							<td className='w-2/3 pl-1 border border-solid border-zinc-300 text-left'>{Array.isArray(a.value) ? a.value.join(' / ') : a.value}</td>
							<td
								className='w-1/5 border border-solid border-zinc-300 text-sm cursor-pointer hover:bg-red-300 hover:text-red-900'
								onClick={() => attributeRemoveHandler(idx)}>
								Remove
							</td>
						</tr>;
					})}
				</tbody>
			</table>
		</div>
		<div className='flex flex-col sm:flex-row items-center justify-between bg-white hover:bg-sky-100 group rounded-md gap-2 p-2 w-fit mx-auto'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col sm:flex-row items-center justify-center'>
						<label htmlFor="aaName" className='font-semibold'>Attribute name</label>
						<input type="text" 
							id="aaName" 
							className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
							value={attributeName}
							onChange={(e) => setAttributeName(e.currentTarget.value)} />
					</div>
					<div className='flex flex-col sm:flex-row items-center justify-center'>
						<label htmlFor="aaValue" className='font-semibold'>Attribute value</label>
						<input type="text" 
							id="aaValue" 
							className='bg-zinc-300 group-hover:bg-sky-300 rounded-md mx-2 px-1 capitalize'
							value={attributeValue}
							onChange={(e) => setAttributeValue(e.currentTarget.value)} />
					</div>
				</div>
				<button
					onClick={addAttributeHandler}
					className="bg-sky-300 hover:bg-orange-300 rounded-md p-2 h-fit">Add</button>
			</div>
		</>
	);
}
