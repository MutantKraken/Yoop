//import "bootstrap"; extra tools for js
import {run} from "./app/game";
import "./main.scss";

const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const userInput = document.getElementById("username-input");

(async () => {
  const DataBase = (await import("./vendor")).DataBase;
  const THREE = await import("three");
  const OrbitControls = (await import("three/examples/jsm/controls/OrbitControls")).OrbitControls;
  
  const db = new DataBase();
  db.login();

  playButton.onclick = () => {
    setTimeout(() => {
      db.setName(userInput.value);
      playMenu.hidden = true;
      
      run(THREE, OrbitControls, db.setScore);
    }, 50);
  };
})();