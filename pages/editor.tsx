import React from 'react';
import EditorAbility from 'components/editors/EditorAbility';
import EditorHero from 'components/editors/CreateHero';

export default function Editor() {
	const [type, setType] = React.useState<editorType>('ability');

	return <div className='w-full h-full'>
		{
			type === 'hero' ? <EditorHero /> : <></>
		}
		{
			type === 'ability' ? <EditorAbility /> : <></>
		}
	</div>;
}
