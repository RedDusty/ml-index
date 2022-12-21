import {AmbientLight, Color, DirectionalLight, FrontSide, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, sRGBEncoding, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

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

function Viewer(div: HTMLDivElement, model: modelType) {
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

	const loader = new GLTFLoader();
	const model_path = typeof model === 'string' ? model : window.location.origin + '/models/' + model.hero + '/' + model.skin + '_' + model.key + '.gltf';
	loader.load(model_path, (gltfScene) => {
		scene.add(gltfScene.scene);
		gltfScene.scene.traverse((child: any) => {
			const material: MeshStandardMaterial = child.material;
			if (material) {
				material.side = FrontSide;
			}
		});
	}, undefined, (e) => console.log(e));

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

export {Viewer, Animate, AnimateCancel};
