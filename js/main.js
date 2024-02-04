let camera, scene, renderer, cube;

init();

function init() {
    scene = new THREE.Scene();

    // Set up camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

    // Set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -1); // Position the cube in front of the camera
    scene.add(cube);

    // Set up WebXR
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        if (supported) {
            document.body.appendChild( VRButton.createButton(renderer) );
        }
    });

    // Set up AR session
    renderer.xr.enabled = true;
    renderer.setAnimationLoop(render);
}

function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
