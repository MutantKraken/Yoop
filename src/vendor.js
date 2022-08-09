import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export class DataBase {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAJI57ifgMnoRmivqnMnCwiAPBGjUwLVwo",
      authDomain: "yoop-c4733.firebaseapp.com",
      projectId: "yoop-c4733",
      storageBucket: "yoop-c4733.appspot.com",
      messagingSenderId: "909409959779",
      appId: "1:909409959779:web:9557cd08219fbecc9f1d56"
    };

    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.database = getDatabase();

    this.playerId;
    this.playerRef;
    this.name;
    this.score = -1;

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.playerId = user.uid;
        this.playerRef = ref(this.database, `players/${this.playerId}`);
      }
    });
  }

  login() {
    signInAnonymously(this.auth).catch((error) => {
      console.log(error.code, error.message);
    });
  }

  update () {
    set(this.playerRef, {
      id: this.playerId,
      name: this.name,
      score: this.score,
    });
  }
  setScore (score_) {
    this.score = score_;
    this.update();
  }
  setName (name_) {
    this.name = name_;
    this.update();
  }
}