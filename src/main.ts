import Phaser from "phaser";
import GameScene from "./scences/gameScenes";
import MainMenuScene from "./start/mainMenuScene";
import CharacterSelectScene from "./start/characterSelectScene";
import TutorialScene from "./start/TutorialScene";
import CreditsScene from "./credits/creditsScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#5DACD8",

  width: 800,
  height: 500,
  input: {
    activePointers: 2,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 500,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 600 },
      debug: false,
    },
  },

  scene: [
    MainMenuScene,
    CharacterSelectScene,
    TutorialScene,
    GameScene,
    CreditsScene,
  ],

  pixelArt: true,
};

new Phaser.Game(config);
