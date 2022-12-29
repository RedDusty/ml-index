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

type viewerType = {
	div: HTMLDivElement;
	model?: modelsType;
	h?: string;
	k?: string;
	setState: React.Dispatch<React.SetStateAction<viewerStateType>>;
	setOptState: React.Dispatch<React.SetStateAction<string | null>>;
}

async function Viewer({div, model, setOptState, setState, h, k}: viewerType) {
	if (scene) {
		scene.clear();
	}

	const model_hero = (model ? model.hero : undefined) || h;
	const model_key = (model ? model.key : undefined) || k;

	if (!model_hero || !model_key) {
		setState('not_found');
		setOptState('No model or queries to find it');
		return;
	}

	const model_info: modelsType = {
		event: model?.event || 'No data',
		hero: model_hero,
		image: model?.image || 'No data',
		key: model_key,
		title: model?.title || 'No data',
		v: model?.v || -1,
		file: model?.file,
		url: model?.url
	};

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

	setOptState('Checking cache');
	const lf_model = typeof model !== 'string' ? model_hero + '_' + model_key : null;

	try {
		const info = await getModelInfoOnline(model_hero, model_key);
		model_info.event = info.event || 'No data';
		model_info.image = info.image || 'No data';
		model_info.title = info.title || 'No data';
		model_info.v = typeof info.v === 'number' ? info.v : -1;
	} catch (error) {
		
	}

	if (typeof model !== 'string' && lf_model) {
		try {
			const local_model = await lfh.getItem(lf_model) as modelIndexedDBType;
			if (local_model && (local_model.v === model_info.v || window.navigator.onLine === false)) {
				console.log('Loading model from cache...');
				setOptState('Loading model from cache');
				model_data = local_model.file;
			} else {
				throw new Error('Cached model not found');
			}
		} catch (error) {
			console.log('Loading model from server...');
			setOptState('Loading model from server');
			try {
				const model_gltf = await getModelOnline(model_hero, model_key);
				if (typeof model_gltf === 'object') {
					cacheModel(lfh, lf_model, model_info, model_hero, model_key, model_gltf);
					model_data = model_gltf;
				} else {
					if (navigator.onLine) {
						setState('not_found');
						setOptState('Model not found on server');
						return;
					} else {
						setState('no_cache');
						setOptState('Connect to the internet to load it');
						return;
					}
				}
			} catch (error) {
				if (navigator.onLine) {
					setState('not_found');
					setOptState('Model not found on server');
					return;
				} else {
					setState('no_cache');
					setOptState('Connect to the internet to load it');
					return;
				}
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
				setOptState('Reading model data');
				GLTFModel(gltf);
			} else {
				setState('error');
				setOptState('Model read error');
				return;
			};
		}
	} catch (error) {
		setState('error');
		setOptState('Model read error');
		return;
	};

	function GLTFModel(gltf: GLTF) {
		setState('done');
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

async function getModelOnline(model_hero: string, model_key: string) {
	const res_url = await axios.get('api/model', {
		params: {
			h: model_hero,
			k: model_key
		}
	});
	
	const url = res_url.data as string;

	const model = await axios.get(url);

	return model.data as Object;
}

async function getModelInfoOnline(model_hero: string, model_key: string) {
	const res = await axios.get('/api/model_info', {
		params: {
			h: model_hero,
			k: model_key
		}
	});
	
	return res.data as modelType;
}

async function cacheModel(lfh: LocalForage, lf_model: string, model_info: modelsType, model_hero: string, model_key: string, model_gltf: Object) {
	try {
		const res = await axios.request({method: 'GET', url: model_info.image, responseEncoding: 'binary', responseType: 'arraybuffer'});
		const image = 'data:image/webp;base64,' + Buffer.from(res.data).toString('base64');
		lfh.setItem(lf_model, {file: model_gltf, v: model_info.v, event: model_info.event, hero: model_hero, image: image, key: model_key, title: model_info.title} as modelIndexedDBType);
	} catch (error) {
		lfh.setItem(lf_model, {file: model_gltf, v: model_info.v, event: model_info.event, hero: model_hero, image: 'No data', key: model_key, title: model_info.title} as modelIndexedDBType);
	}
}

export {Viewer, Animate, AnimateCancel};
