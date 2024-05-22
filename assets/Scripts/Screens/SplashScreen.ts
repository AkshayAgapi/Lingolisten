import OrientationManager from "../../LoadScene/OrientationManager";
import GameEvents, { GameEventNames } from "../Common/GameEvents";
import ScreenManager from "../Manager/ScreenManager";
import MainMenuScreen from "./MainMenuScreen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SplashScreen extends cc.Component {

    onLoad() {
        this.scheduleOnce(this.startGame, 2); 
        OrientationManager.changeOrientation(0);
    }

    startGame() {
        // Fade out the splash screen
        const fadeOutDuration = 0.2; 
        cc.tween(this.node)
            .to(fadeOutDuration, { opacity: 0 }) 
            .call(() => {
                this.startGameLogic();
            })
            .start();
    }

    startGameLogic() {
        ScreenManager.Instance().showScreen(MainMenuScreen);
    }
}
