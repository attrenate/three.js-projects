// 1️⃣ Import Three.js and OrbitControls
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// 2️⃣ Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0');

// 3️⃣ Create camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// 4️⃣ Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 5️⃣ Add a spinning dodecahedron
const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 'orange', flatShading: true });
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

// 6️⃣ Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 7️⃣ Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;       // smooth motion
controls.dampingFactor = 0.05;
controls.enableZoom = true;          // zoom in/out
controls.enablePan = true;           // pan with right mouse button

// 8️⃣ Animate
function animate() {
  requestAnimationFrame(animate);

  // Spin dodecahedron
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}
animate();

// 9️⃣ Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
