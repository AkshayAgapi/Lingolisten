const { ccclass, property } = cc._decorator;

@ccclass
export default class AnswerButton extends cc.Component {
    @property(cc.Label)
    answerLabel: cc.Label = null;

    @property(cc.Node)
    button: cc.Node = null;

    private _answerText: string = "";
    private _selected: boolean = false;
    private _isCorrect: boolean = false;

    onLoad() {
        this.node.color  = new cc.Color(220, 102, 31);
    }

    setAnswerText(answer: string) {
        this._answerText = answer;
        this.answerLabel.string = answer;
    }

    setSelected(selected: boolean) {
        console.log("SetSelected : "+selected);
        this._selected = selected;
        this.updateButtonColor();
    }

    isCorrectAnswer(correctAnswer : string): boolean {
        console.log("correctAnswer : "+correctAnswer);
        console.log("this._answerText : "+this._answerText);

        if(correctAnswer === this._answerText){
            return true;
        }
        return false;
    }

    setCorrect() {
        this._isCorrect = true;
        this.updateButtonSelectionStatusColr();
    }

    setIncorrect() {
        this._isCorrect = false;
        this.updateButtonSelectionStatusColr();
    }

    private updateButtonColor() {
        if (this._selected) {
            console.log("Selected color : "+this.answerLabel.string);
            this.node.color = new cc.Color(105, 41, 0); // Change to your selected color
        }
        else{
            this.node.color  = new cc.Color(220, 102, 31);// Change to your default color for incorrect answers
        }
    }

    private updateButtonSelectionStatusColr(){
        if (this._isCorrect) {
            this.node.color  = new cc.Color(79, 175, 95);
        } else {
            this.node.color  = new cc.Color(175, 79, 79);
        }
    }
}

