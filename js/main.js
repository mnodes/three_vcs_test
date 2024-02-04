// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a box geometry to make the plane thicker
const geometry = new THREE.BoxGeometry(5, 0.2, 5); // Width, Height, Depth

// Create a basic material with white color
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// Combine geometry and material into a mesh
const plane = new THREE.Mesh(geometry, material);

// Add the plane to the scene
scene.add(plane);

// Position the plane
plane.position.y = 0.1; // Adjust position to half of the height to keep it above the ground

// Position the camera
camera.position.z = 5;

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Define a function to animate the scene
function animate() {
    // Rotate the plane around the x-axis
    plane.rotation.x += 0.01; // Adjust rotation speed here

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
