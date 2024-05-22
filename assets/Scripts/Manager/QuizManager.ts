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
        if (index < 0 || index >= this.quizData.length) {
            // Calculate the valid index by taking the modulus
            index = (index % this.quizData.length + this.quizData.length) % this.quizData.length;
        }
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
