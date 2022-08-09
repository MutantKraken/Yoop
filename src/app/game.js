import {Graphics} from "./utils/graphics";
import {levelCount} from "./level";

const levelSelect = document.getElementById("level-select");
const buttons = document.getElementsByClassName("level-button");
const buttonsWrapper = document.getElementById("buttons-wrapper");
const canvasWrapper = document.getElementById("canvas-wrapper");
const backToLevelSelect = document.getElementById("back-level-select");

function beginLevel(graphics, level) {
  levelSelect.setAttribute("hidden", true);
  canvasWrapper.removeAttribute("hidden");
  graphics.start();
}

function toLevelSelect(graphicsRef) {
  graphicsRef.stop();
  levelSelect.removeAttribute("hidden");
  canvasWrapper.setAttribute("hidden", true);
}

function constructLevelSelect(graphicsRef) {
  for (var i = 0; i < levelCount; i++) {
    buttonsWrapper.innerHTML += '<br><button type="button" class="btn btn-primary level-button">'+(i+1)+'</button>';
  }
  for (var i = 0; i < levelCount; i++) {
    ((level) => {
      buttons[level].onclick = () => {
        beginLevel(graphicsRef, level+1);
      }
    })(i);
  }
}

export const run = (THREE, OrbitControlsClass, setScore) => {
  const graphics = new Graphics(THREE, OrbitControlsClass);
  constructLevelSelect(graphics);
  backToLevelSelect.onclick = () => {
    toLevelSelect(graphics);
  }
  toLevelSelect(graphics);
};