import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();

// const normalTexture = textureLoader.load("/normalmap.jpg");
const normalTexture = textureLoader.load("/memap2.png");
const image = textureLoader.load("/me.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry(1, 1, 1);

// Materials

const material = new THREE.MeshStandardMaterial({
  metalness: 0.2,
  roughness: 0.4,
  normalMap: normalTexture,
  map: image,
});
// material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const light1Color = {
  color: 0xffffff,
};
const light1 = gui.addFolder("Light 1");
const pointLight = new THREE.PointLight(light1Color.color);
pointLight.position.set(-4, 0, 3);
pointLight.intensity = 0.5;
scene.add(pointLight);

light1.add(pointLight.position, "y").min(-3).max(3).step(0.01);
light1.add(pointLight.position, "x").min(-6).max(6).step(0.01);
light1.add(pointLight.position, "z").min(0).max(3).step(0.01);
light1.add(pointLight, "intensity").min(0).max(10).step(0.01);

light1
  .addColor(light1Color, "color")
  .onChange(() => pointLight.color.set(light1Color.color));

const light2Color = {
  color: 0xffffff,
};
const light2 = gui.addFolder("Light 2");
const pointLight2 = new THREE.PointLight(light2Color.color);
pointLight2.position.set(4, 0, 3);
pointLight2.intensity = 0.5;
scene.add(pointLight2);

light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
light2.add(pointLight2.position, "z").min(0).max(3).step(0.01);
light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

light2
  .addColor(light2Color, "color")
  .onChange(() => pointLight2.color.set(light2Color.color));

const pointLight3 = new THREE.PointLight(0xffffff, 0.1);
pointLight3.position.set(0, 0, 3);
scene.add(pointLight3);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (e) => {
  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
};

// const updateSphere = () => {
//   sphere.position.y = window.scrollY * 0.001;
// };

document.addEventListener("mousemove", onDocumentMouseMove);
// document.addEventListener("scroll", updateSphere);

// const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.00005;
  targetY = mouseY * 0.00005;

  //   const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 1.1 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.1 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
