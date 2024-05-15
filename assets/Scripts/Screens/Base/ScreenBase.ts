const { ccclass, property } = cc._decorator;

@ccclass
export abstract class ScreenBase extends cc.Component {

    @property(cc.Node)
    popupCard: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null; 

    public onShow(params?: any[]): void {
        this.node.active = true;
        this.setupPopup(params);
        this.initPopup();
    }

    protected abstract setupPopup(params?: any[]): void;

    public onHide(): void {
        this.hideScreenTween();
    }

    private initPopup() {
        this.popupCard.scale = 0;
        this.background.opacity = 0; 
        this.showScreenTween();
    }

    private showScreenTween() {
        // Tween for the background fade-in
        cc.tween(this.background)
            .to(0.3, { opacity: 148 })
            .start();

        // Tween for the popup card scale animation
        cc.tween(this.popupCard)
            .to(0.3, { scale: 1.1 }, { easing: 'quadOut' }) 
            .to(0.2, { scale: 1 }, { easing: 'quadOut' })
            .start();
    }

    private hideScreenTween() {
        // Tween for the popup card scale animation
        cc.tween(this.popupCard)
            .to(0.05, { scale: 1.1 }, { easing: 'quadIn' })
            .to(0.1, { scale: 0 }, { easing: 'quadIn' })
            .call(() => {
                this.node.active = false;
                this.onAnimationComplete();
            })
            .start();
    
        // Tween for the background fade-out
        cc.tween(this.background)
            .to(0.1, { opacity: 0 }) 
            .start();
    }

    private onAnimationComplete() {
        this.node.active = false; 
    }
}