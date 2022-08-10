import { createMapScene } from "./map";
import { levels } from "./level";
import { Game } from "./game";
var THREE;
var OrbitControls;

var run = false;
var startTime;
var fpsInterval;

var renderer;
var camera;
var controls;
var scene;
const game = new Game();

export function setLib(three, oc) {
  THREE = three;
  OrbitControls = oc;
}

export class Cube {
  constructor(size, mat, castShadow = true) {
    const geometry = new THREE.BoxGeometry( size.x, size.y, size.z);
    
    this.position = new THREE.Vector3();
    this.size = size;
    this.cube = new THREE.Mesh(geometry, mat);
    this.cube.receiveShadow = true;
    this.cube.castShadow = castShadow;
    this.updatePosition();
  }
  setPosition(x, y, z) {
    this.position = new THREE.Vector3(x, y, z);
    this.updatePosition();
  }
  getPosition() {
    return this.position;
  }
  translate(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
    this.updatePosition();
  }
  updatePosition() {
    this.cube.position.setX(this.position.x + this.size.x/2);
    this.cube.position.setY(this.position.y + this.size.y/2);
    this.cube.position.setZ(this.position.z + this.size.z/2);
  }
  getMesh() {
    return this.cube;
  }
}

export function init() {
  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg"),});
  renderer.shadowMap.enabled = true;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  controls = new OrbitControls(camera, renderer.domElement);
}

function resize() {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  const now = Date.now();
  const elapsed = now - startTime;
  if (run === false) {
    return;
  }
  if (elapsed > fpsInterval) {
    startTime = now - (elapsed % fpsInterval);
    game.update();
    controls.update();
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
}

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  startTime = Date.now();
  animate();
}

function setCameraPosition(level) {
  const rows = levels[level-1].rows;
  const cols = levels[level-1].cols;
  const length = Math.sqrt(rows*rows + cols*cols);
  camera.position.set(rows, length/1.5, cols/2);
}

export function start(level) {
  run = true;
  resize();
  setCameraPosition(level);
  window.addEventListener('resize', resize, true);
  
  const dat = createMapScene(THREE, level);
  scene = dat[0];
  game.start(levels[level-1], dat[1]);
  startAnimating(50);
}

export function stop() {
  run = false;
  game.stop();
  window.removeEventListener('resize', resize, true);
}