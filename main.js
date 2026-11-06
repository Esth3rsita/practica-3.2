import * as THREE from 'three';

// 1. Crear Escena
const scene = new THREE.Scene();

// 2. Configurar Cámara (FOV, Aspect, Near, Far)
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 4;

// 3. Configurar Renderizador
const canvasElement = document.querySelector('#mi-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Redimensionar automáticamente al ajustar la pantalla
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 4. Crear la Geometría (Una Dona / Torus)
// Parámetros: (Radio principal, Radio del tubo, Segmentos radiales, Segmentos tubulares)
const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);

// 5. Crear el Material (Wireframe con color magenta/cyan)
const material = new THREE.MeshBasicMaterial({ 
  color: 0xDE05FF, 
  wireframe: true 
});

// 6. Crear la Malla y agregar a la escena
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// 7. Bucle de Animación
function animate() {
  requestAnimationFrame(animate);

  // Rotación continua en 3 ejes para un movimiento tridimensional dinámico
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.015;
  torus.rotation.z += 0.005;

  // Renderizar escena
  renderer.render(scene, camera);
}

// Iniciar ciclo
animate();