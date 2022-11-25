import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const ambientLight = new THREE.AmbientLight(0xff0f0f)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
scene.add(directionalLight)
directionalLight.position.set(30,50,20)

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 2, 50);
orbit.update();

let figuresList = [];

const buttonElem = document.getElementById('create-geometry');

let createGeometry = function () {
	const geometryType = this.parentElement.children[0].value;
	const geometrySize = +this.parentElement.children[1].value;

	switch (geometryType) {
		case 'box':
			createBox(geometrySize);
			break;
		case 'sphere':
			createSphere(geometrySize);
			break;
		case 'pyramid':
			createPyramid(geometrySize);
			break;

		default:
			break;
	}
	console.dir(this.parentElement.children[1].value);
};

buttonElem.addEventListener('click', createGeometry);

function updateList(uuid) {
	const uuidList = document.getElementById('uuid-list');
	const li = document.createElement('li');
	const listText = document.createElement('p');
	const removeBtn = document.createElement('button');
	listText.innerText = uuid;
	removeBtn.innerText = 'X';
	uuidList.addEventListener('click', (e) => {
		let el = e.target;
		if (removeBtn === el) {
			el.parentElement.remove();
			deleteGeometry(uuid);
		}
	});
	li.appendChild(listText);
	li.appendChild(removeBtn);
	uuidList.appendChild(li);
}

function deleteGeometry(uuid) {
	figuresList = figuresList.filter((el) => {
		if (el.uuid !== uuid) return el;
		scene.remove(el);
	});
}

function randomPosition() {
	return Math.floor(Math.random() * 50 - 25);
}
function createBox(size) {
	const boxGeometry = new THREE.BoxGeometry();
	const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
	const box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.scale.set(size, size, size);
	box.position.set(randomPosition(), randomPosition(), randomPosition());
	scene.add(box);
	figuresList.push(box);
	updateList(box.uuid);
}

function createSphere(size) {
	const sphereGeometry = new THREE.SphereGeometry();
	const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.scale.set(size, size, size);
	sphere.position.set(randomPosition(), randomPosition(), randomPosition());
	scene.add(sphere);
	figuresList.push(sphere);
	updateList(sphere.uuid);
}

function createPyramid(size) {
	const pyramidGeometry = new THREE.CylinderGeometry(0, 2, 2, 4, 1);
	const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
	const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
	pyramid.scale.set(size, size, size);
	pyramid.position.set(randomPosition(), randomPosition(), randomPosition());
	scene.add(pyramid);
	figuresList.push(pyramid);
	updateList(pyramid.uuid);
}

function animate() {
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
