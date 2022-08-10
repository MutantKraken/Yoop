import { levels, boundingId } from "./level";
import { Cube } from "./graphics";
import { Bar } from "./bar";

const wallCol = 0x0011cf;
const playerCol = 0xdd0000;

var bars = [];

function addBar(THREE, scene, layout, id, material) {
  const bound = boundingId(layout, id);
  const rlen = bound[1]-bound[0]+1;
  const clen = bound[3]-bound[2]+1;
  const box = new Cube(new THREE.Vector3(rlen, 1, clen), material);
  box.setPosition(bound[0], 0.5, bound[2]);
  scene.add(box.getMesh());
  bars.push(new Bar(id, box, rlen, clen));
}

export function createMapScene (THREE, l) {
  const level = levels[l-1];

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcbd8dd);//edfaff);

  const pointLight = new THREE.DirectionalLight(0xffffff, 1);
  pointLight.position.set(8,10,-5);
  pointLight.castShadow = true;
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const wallMaterial = new THREE.MeshStandardMaterial( {color: wallCol} );
  const playerMaterial = new THREE.MeshStandardMaterial( {color: playerCol} );

  const cube = new Cube(new THREE.Vector3(level.rows, 0.5, level.cols), wallMaterial);
  scene.add(cube.getMesh());

  for (var r = 0; r < level.rows; r++) {
    for (var c = 0; c < level.cols; c++) {
      if (level.layout[r][c] === 1) {
        const cube = new Cube(new THREE.Vector3(1, 1, 1), wallMaterial, false);
        cube.setPosition(r, 0.5, c);
        scene.add(cube.getMesh());
      }
    }
  }

  scene.translateX(-level.rows/2);
  scene.translateZ(-level.cols/2);

  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(gridHelper);

  bars = [];

  addBar(THREE, scene, level.layout, 2, playerMaterial);
  for (var i = 3; i <= level.maxId; i++) {
    const r = 0x8f - (i-3)*15;
    const g = 0xda - (i-3)*15;
    const b = 0xff - (i-3)*15;
    const obsticalMaterial = new THREE.MeshStandardMaterial( {color: ((r<<16) | (g<<8) | b) });
    addBar(THREE, scene, level.layout, i, obsticalMaterial);
  }

  return [scene, bars];
}