import React from 'react';
import EditorAbility from 'components/editors/EditorAbility';
import EditorHero from 'components/editors/CreateHero';
import EditorModel from 'components/editors/EditorModel';

export default function Editor() {
	const [type, setType] = React.useState<editorType>('model');

	return <div className='w-full h-full'>
		{
			type === 'hero' ? <EditorHero /> : <></>
		}
		{
			type === 'ability' ? <EditorAbility /> : <></>
		}
		{
			type === 'model' ? <EditorModel /> : <></>
		}
	</div>;
}
