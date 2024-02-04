// Import necessary modules
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

// Initialize Three.js scene, renderer, camera, and controls
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true; // Enable XR rendering
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create an AR button
const arButton = ARButton.createButton(renderer);
document.body.appendChild(arButton);

// Function to create the AR scene
async function createScene() {
    // Load a 3D model (replace with your model URL)
    const loader = new GLTFLoader();
    const model = await loader.load('model.glb');
    model.scene.scale.set(0.1, 0.1, 0.1);
    scene.add(model.scene);

    // Start the AR session
    const session = await navigator.xr.requestSession('immersive-ar');
    renderer.xr.setSession(session);

    // Update rendering for AR
    renderer.xr.addEventListener('sessionstart', () => {
        camera.projectionMatrix = session.projectionMatrix;
    });

    // Render loop
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

// Start the AR experience when the button is clicked
arButton.addEventListener('click', createScene);
