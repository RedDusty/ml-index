import React from 'react';
import {Animate, AnimateCancel, Viewer} from 'scripts/viewer';

export default function ModelViewer({model}: {model: modelType | string}) {
	const threeRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (threeRef && threeRef.current) {
			Viewer(threeRef.current, model);

			Animate();
			
			return () => {
				AnimateCancel();
			};
		}
	}, [threeRef, model]);

	return <div ref={threeRef} className="w-full h-full from-black to-white bg-gradient-to-t"></div>;
	// return <div ref={threeRef} className="w-full h-full sm:w-96 sm:h-[480px] from-black to-white bg-gradient-to-t"></div>;
}
