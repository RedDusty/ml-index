import axios from 'axios';
import {AmbientLight, Color, DirectionalLight, FrontSide, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, sRGBEncoding, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import lf from 'localforage';

let frames: number;
let scene: Scene = new Scene();
let renderer: WebGLRenderer;
let VIEWER_WIDTH: number;
let VIEWER_HEIGHT: number;
let dir_light: DirectionalLight;
let camera: PerspectiveCamera; 
let point_light: PointLight;
let ambient_light: AmbientLight;

function init() {
	scene = new Scene();
	renderer = new WebGLRenderer({antialias: true});
	dir_light = new DirectionalLight(0xffffff, 0.8 * Math.PI);
	camera = new PerspectiveCamera(75, VIEWER_WIDTH / VIEWER_HEIGHT, 0.01, 1000);
	point_light = new PointLight(0xffffff, 0.8, 10, 1);
	ambient_light = new AmbientLight(0xffffff, 0.3);
}

async function Viewer(div: HTMLDivElement, model: modelType | string) {
	if (scene) {
		scene.clear();
	}

	VIEWER_WIDTH = div.clientWidth;
	VIEWER_HEIGHT = div.clientHeight;
	init();
	scene.background = new Color(0xffffff);

	camera.position.set(0, 2, 2);

	renderer.physicallyCorrectLights = true;
	renderer.outputEncoding = sRGBEncoding;
	renderer.setPixelRatio(window.devicePixelRatio);
	if (div.childNodes.length) {
		div.innerHTML = '';
	}
	renderer.setSize(VIEWER_WIDTH, VIEWER_HEIGHT);
	div.appendChild(renderer.domElement);
	renderer.render(scene, camera);

	const blob_model = typeof model === 'string' ? model : null;
	let model_data: Object | undefined = undefined;
	const lfh = lf.createInstance({name: 'heroes', storeName: 'heroes'});

	const lf_model = typeof model !== 'string' ? model.hero + '_' + model.event + '_' + model.key : null;

	if (typeof model !== 'string' && lf_model) {
		try {
			const local_model = await lfh.getItem(lf_model) as modelLocalType;
			if (local_model && (local_model.v === model.v || window.navigator.onLine === false)) {
				console.log('Loading model from cache...');
				model_data = local_model.file;
			} else {
				throw new Error('Cached model not found');
			}
		} catch (error) {
			console.log('Loading model from server...');
			const model_gltf = await getModelOnline(model);
			if (typeof model_gltf === 'object') {
				lfh.setItem(lf_model, {file: model_gltf, v: model.v} as modelLocalType);
				model_data = model_gltf;
			} else {
				return returnError('No internet connection. Cached model not found.');
			}
		}
	}

	const gltfloader = new GLTFLoader();
	try {
		if (typeof blob_model === 'string') {
			const gltf = await gltfloader.loadAsync(blob_model);
			GLTFModel(gltf);
		} else {
			if (model_data) {
				const gltf = await gltfloader.parseAsync(model_data as any, '');
				GLTFModel(gltf);
			} else return returnError('Model loading error');
		}
	} catch (error) {
		return returnError(String(returnError || 'Loading model error'));
	}

	function GLTFModel(gltf: GLTF) {
		scene.add(gltf.scene);
		gltf.scene.traverse((child: any) => {
			const material: MeshStandardMaterial = child.material;
			if (material) {
				material.side = FrontSide;
			}
		});
	}

	scene.add(ambient_light);

	dir_light.position.set(0, 0, 0);
	scene.add(dir_light);

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.autoRotate = false;
	controls.screenSpacePanning = true;
	controls.target.set(0, 0, 0);

	// const hemiLight = new HemisphereLight(0x0000ff, 0x00ff00);
	// scene.add(hemiLight);
	
	scene.add(point_light);
}

function Animate() {
	point_light.position.copy(camera.position);

	dir_light.position.set(camera.position.x, camera.position.y, camera.position.z);
	frames = requestAnimationFrame(Animate);
	renderer.render(scene, camera);
};

function AnimateCancel() {
	if (frames) {
		cancelAnimationFrame(frames);
	}
}

async function getModelOnline(model: modelType) {
	const res = await axios.get('api/model', {
		params: {
			h: model.hero,
			e: model.event,
			k: model.key
		}
	});
	
	return res.data as Object | string;
}

function returnError(msg?: string) {
	return msg || 'Error. Something went wrong...';
}

export {Viewer, Animate, AnimateCancel};
