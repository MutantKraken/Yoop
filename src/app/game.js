import {Graphics} from "./utils/graphics";
import "./level";

const levelSelect = document.getElementById("level-select");
const buttons = levelSelect.children;

export const run = (THREE, OrbitControlsClass, setScore) => {
  const graphics = new Graphics(THREE, OrbitControlsClass);
  levelSelect.removeAttribute("hidden");
  for (var i = 0; i < buttons.length; i++) {

  }
  buttons[2].onclick = () => {
    graphics.start();
  }
};