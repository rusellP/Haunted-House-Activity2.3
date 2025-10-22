// Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#262837');

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.set(4, 2, 5);

// Fog
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('https://raw.githubusercontent.com/brunosimon/threejs-journey-assets/master/textures/door/color.jpg');
const bricksColorTexture = textureLoader.load('https://raw.githubusercontent.com/brunosimon/threejs-journey-assets/master/textures/bricks/color.jpg');

// House Container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ map: bricksColorTexture })
);
walls.position.y = 1.25;
walls.castShadow = true;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ map: doorColorTexture }) 
);
door.position.y = 1;
door.position.z = 2 + 0.01; 
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

// Bush 1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.castShadow = true;
house.add(bush1);

// Bush 2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.castShadow = true;
house.add(bush2);


// Graves
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.3, z);
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' }) // Using a simple color
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// Lights
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
moonLight.castShadow = true;
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
doorLight.castShadow = true;
house.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
ghost1.castShadow = true;
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
ghost2.castShadow = true;
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
ghost3.castShadow = true;
scene.add(ghost3);

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Animate Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
