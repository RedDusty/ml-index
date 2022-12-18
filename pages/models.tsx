import React from 'react';
import {Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, MeshStandardMaterial, Color, sRGBEncoding, FrontSide, DirectionalLight, SpotLight, PointLight, HemisphereLight} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default function Models() {
	const threeRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		let frames: number;

		if (threeRef && threeRef.current) {
			let VIEWER_WIDTH = threeRef.current.clientWidth;
			let VIEWER_HEIGHT = threeRef.current.clientHeight;
			const scene = new Scene();
			scene.background = new Color(0xffffff);

			const camera = new PerspectiveCamera(75, VIEWER_WIDTH / VIEWER_HEIGHT, 0.01, 1000);
			camera.position.set(0, 2, 2);

			const renderer = new WebGLRenderer({antialias: true});
			renderer.physicallyCorrectLights = true;
			renderer.outputEncoding = sRGBEncoding;
			renderer.setPixelRatio(window.devicePixelRatio);
			if (threeRef.current.childNodes.length) {
				threeRef.current.innerHTML = '';
			}
			renderer.setSize(VIEWER_WIDTH, VIEWER_HEIGHT);
			threeRef.current.appendChild(renderer.domElement);
			renderer.render(scene, camera);

			const loader = new GLTFLoader();
			loader.load(window.location.origin + '/models/fanny.gltf', (gltfScene) => {
				scene.add(gltfScene.scene);
				gltfScene.scene.traverse((child: any) => {
					const material: MeshStandardMaterial = child.material;
					if (material) {
						material.side = FrontSide;
					}
				});
			}, undefined, (e) => console.log(e));

			const light = new AmbientLight(0xffffff, 0.3);
			scene.add(light);

			const dir_light = new DirectionalLight(0xffffff, 0.8 * Math.PI);
			dir_light.position.set(0, 0, 0);
			scene.add(dir_light);

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.autoRotate = false;
			controls.screenSpacePanning = true;
			controls.target.set(0, 0, 0);
			
			const point_light = new PointLight(0xffffff, 0.8, 10, 1);
			scene.add(point_light);

      // const hemiLight = new HemisphereLight(0x0000ff, 0x00ff00);
      // scene.add(hemiLight);

			const animate = () => {
				point_light.position.copy(camera.position);

				dir_light.position.set(camera.position.x, camera.position.y, camera.position.z);
				frames = requestAnimationFrame(animate);
				renderer.render(scene, camera);
			};

			animate();
			
			return () => {
				if (frames) {
					cancelAnimationFrame(frames);
				}
			};
		}
	}, [threeRef]);

	return <div ref={threeRef} className="w-full h-full sm:w-96 sm:h-[480px] from-black to-white bg-gradient-to-t"></div>;
}
