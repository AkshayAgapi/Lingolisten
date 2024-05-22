const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomButton extends cc.Component {
    @property(cc.Float)
    scaleDuration: number = 0.1; // Duration of the scale animation

    @property(cc.Float)
    scaleAmount: number = 1.2; // Amount to scale up the node

    onLoad() {
        // Register click event handler for the button node
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    onClick() {
        // Scale up the node
        const scaleUpAction = cc.scaleTo(this.scaleDuration, this.scaleAmount);
        // Scale down the node (back to original size)
        const scaleDownAction = cc.scaleTo(this.scaleDuration, 1);
        // Create a sequence of actions
        const sequence = cc.sequence(scaleUpAction, scaleDownAction);
        // Run the sequence on the node
        this.node.runAction(sequence);
    }
}
