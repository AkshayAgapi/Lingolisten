import ScreenManager from "../Manager/ScreenManager";
import { ScreenBase } from "./Base/ScreenBase";
import GamePlayScreen from "./GamePlayScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenuScreen extends ScreenBase {

    @property(cc.Button)
    startButton: cc.Button = null;

    onLoad() {
        // Register a click event handler for the start button
        this.startButton.node.on('click', this.onStartButtonClick, this);
    }

    protected setupPopup(params?: any[]): void {
    }

    onStartButtonClick() {
        ScreenManager.Instance().showScreen(GamePlayScreen);
    }

    protected onDestroy(): void {
        this.startButton.node.off('click', this.onStartButtonClick, this); 
    }
}
