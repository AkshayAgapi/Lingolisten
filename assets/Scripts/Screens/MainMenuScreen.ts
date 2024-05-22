import CustomButton from "../Common/CustomButtom";
import ScreenManager from "../Manager/ScreenManager";
import { ScreenBase } from "./Base/ScreenBase";
import GamePlayScreen from "./GamePlayScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenuScreen extends ScreenBase {

    @property(cc.Button)
    startButton: cc.Button = null;

    // @property(CustomButton)
    // customButton: CustomButton = null;

    onLoad() {
        // Register a click event handler for the start button
        this.startButton.node.on('click', this.onStartButtonClick, this);

        // this.customButton.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     this.customButton.onClick(); // Call the onClick method of the custom button
        // }, this.customButton);
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
