// Scene setup 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Material
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true });

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Camera position
camera.position.z = 5;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); // Positioned at (0, 1, 0) relative to the scene origin
scene.add(directionalLight);

// Mouse interaction
const mouse = new THREE.Vector2();
const cameraStartPosition = new THREE.Vector3();
const cameraStartRotation = new THREE.Vector2();

function onMouseMove(event) {
    const deltaX = event.clientX - window.innerWidth / 2;
    const deltaY = event.clientY - window.innerHeight / 2;

    camera.rotation.y = cameraStartRotation.y - deltaX * 0.002;
    camera.rotation.x = cameraStartRotation.x - deltaY * 0.002;
}

function onMouseDown(event) {
    cameraStartPosition.copy(camera.position);
    cameraStartRotation.x = camera.rotation.x;
    cameraStartRotation.y = camera.rotation.y;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

document.addEventListener('mousedown', onMouseDown);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
