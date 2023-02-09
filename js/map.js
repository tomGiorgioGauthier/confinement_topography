// import * as THREE from './Three.js';
import { Cloud } from './cloud.js';
import { Vector } from './vector.js';
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

const DEFAULT_CAMERA_POSITION = 1000;

let camera, scene, renderer, controls;
camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 14000);
let data = undefined;

let cameraPosition = new Vector(-DEFAULT_CAMERA_POSITION, -DEFAULT_CAMERA_POSITION, DEFAULT_CAMERA_POSITION);
let cameraPointingTo = new Vector(0, 0, 0);

window.addEventListener('load', () => {
    init();
});

async function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    let cloud = new Cloud();
    let colors = [];
    let dbFileName = document.querySelector('#db-name').innerHTML;
    dbFileName = ('./' + dbFileName + '.json').replaceAll(/\s/g, '')
    fetch(dbFileName)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            let keys = Object.keys(data);
            keys.forEach(key => {
                let point = data[key];
                point = new Vector(point.x, point.y, point.z);
                if (!point.isNull()) {
                    if (point.z > cameraPosition.z) {
                        cameraPosition.z = point.z;
                    }
                    cloud.points.push(point.x, point.y, point.z);
                    colors.push(255, 255, 255);
                }
            });
            cameraPosition.z = cameraPosition.z + 500;
            camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            camera.lookAt(cameraPointingTo.x, cameraPointingTo.y, cameraPointingTo.z);
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(cloud.points, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            geometry.computeBoundingSphere();
            const material = new THREE.PointsMaterial({ size: 10, vertexColors: true });
            const points = new THREE.Points(geometry, material);
            scene.add(points);
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            renderer.render(scene, camera);
            controls = new TrackballControls(camera, renderer.domElement);
            controls.rotateSpeed = 3.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            animate();
        });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / 12);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}