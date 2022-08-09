import { KeyBoard } from "./keyboard";

const canv = document.getElementById("bg");

export class Graphics {
  constructor (THREE, OrbitControlsClass) {
    this.THREE = THREE;
    this.run = false;

    this.renderer = new this.THREE.WebGLRenderer({canvas: canv,});
    this.resize();
    this.controls = new OrbitControlsClass(this.camera, this.renderer.domElement);

    this.kb = new KeyBoard();
  }

  resize() {
    this.camera = new this.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.position.setZ(30);
  }
  animate() {
    if (this.run === false) {
      return;
    }
    requestAnimationFrame(() => {this.animate()});
    this.torus.rotation.x += 0.01;
    this.torus.rotation.y += 0.005;
    this.torus.rotation.z += 0.01;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
  start() {
    this.run = true;
    this.kb.start();
    canv.removeAttribute("hidden");
    window.addEventListener('resize', this.resize, true);

    this.scene = new this.THREE.Scene();
    this.scene.background = new this.THREE.Color( 0xefefff );
    this.camera.position.setZ(30);

    const geometry = new this.THREE.TorusGeometry(10, 3, 16, 100);
    const material = new this.THREE.MeshStandardMaterial({color: 0xFF6347});
    this.torus = new this.THREE.Mesh(geometry, material);
    this.scene.add(this.torus);

    const pointLight = new this.THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5);
    const ambientLight = new this.THREE.AmbientLight(0xffffff);
    this.scene.add(pointLight, ambientLight);

    const gridHelper = new this.THREE.GridHelper(200, 50);
    this.scene.add(gridHelper);
    this.animate();
  }
  stop() {
    this.renderer.clear();
    const clearScene = new this.THREE.Scene();
    clearScene.background = new this.THREE.Color( 0xffffff );
    canv.setAttribute("hidden", true);
    this.renderer.render(clearScene, this.camera);
    this.run = false;
    this.kb.stop();
    window.removeEventListener('resize', this.resize, true);
    this.scene = undefined;
  }
}