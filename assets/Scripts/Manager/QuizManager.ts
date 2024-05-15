const { ccclass, property } = cc._decorator;

@ccclass
export default class QuizManager extends cc.Component {
    @property({ type: cc.JsonAsset })
    quizDataJson: cc.JsonAsset = null;

    private quizData: QuizQuestion[] = [];

    onLoad() {
        cc.loader.loadRes("Data/ClipData", cc.JsonAsset, (err, jsonAsset) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            
            this.quizData = jsonAsset.json as QuizQuestion[];

            
            for (let i = 0; i < this.quizData.length; i++) {
                console.log(this.quizData[i].correct_answer); 
            }

        });
    }

    getQuizQuestion(index: number): QuizQuestion {
        return this.quizData[index];
    }

    getQuizData(){
        return this.quizData;
    }
}

export interface QuizQuestion {
    audio_path: string;
    correct_answer: string;
}
