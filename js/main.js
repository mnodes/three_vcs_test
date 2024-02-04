let scene, camera, renderer, cube;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(0, 1.6, 0); // Set camera position at eye level

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Enable WebXR

    document.body.appendChild(renderer.domElement);

    // Create a white cube
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Handle XR session
    document.getElementById('start-ar-button').addEventListener('click', () => {
        if (renderer.xr.isPresenting) {
            renderer.xr.end();
        } else {
            renderer.xr.requestSession('immersive-ar', {
                requiredFeatures: ['hit-test'],
                optionalFeatures: ['dom-overlay'],
            }).then((session) => {
                session.addEventListener('end', () => {
                    // Reset cube position when AR session ends
                    cube.position.set(0, 0, 0);
                });
                renderer.xr.setReferenceSpaceType('local');
                renderer.xr.setSession(session);
            });
        }
    });

    animate();
}

function animate() {
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}
