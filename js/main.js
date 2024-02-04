window.addEventListener('DOMContentLoaded', init);

function init() {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Set up AR
    navigator.xr.requestDevice().then(xrDevice => {
        xrDevice.requestSession({ mode: 'immersive-ar' }).then(session => {
            session.updateRenderState({ baseLayer: new XRWebGLLayer(session, renderer) });
            session.requestAnimationFrame(onXRFrame);
        });
    });

    function onXRFrame(time, frame) {
        const session = frame.session;
        session.requestAnimationFrame(onXRFrame);

        const pose = frame.getViewerPose(frame.views[0].viewId);
        if (pose) {
            const view = pose.views[0];
            const viewport = session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            const viewMatrix = new THREE.Matrix4().fromArray(view.transform.inverse.matrix);
            camera.matrixWorldInverse.fromArray(viewMatrix.elements);
            camera.updateMatrixWorld(true);
            renderer.render(scene, camera);
        }
    }
}
