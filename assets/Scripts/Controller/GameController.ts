import AudioManager from "../Manager/AudioManager";
import QuizManager, { QuizQuestion } from "../Manager/QuizManager";
import AnswerButton from "../UI/AnswerButton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    @property(cc.Prefab)
    answerButtonPrefab: cc.Prefab = null;

    @property(cc.Node)
    answerButtonContainer: cc.Node = null;

    @property(QuizManager)
    quizManager: QuizManager = null;

    @property(AudioManager)
    audioManager: AudioManager = null;

    @property(cc.Node)
    checkButton: cc.Node = null;

    @property(cc.Node)
    listenButton: cc.Node = null;

    private selectedAnswerButton: cc.Node = null;
    private currentQuestionIndex: number = 0;
    private currentQuestion: QuizQuestion = null;
    private correctAnswerButton: AnswerButton = null;

    onLoad() {
        this.checkButton.on(cc.Node.EventType.TOUCH_END, this.handleCheckButtonClick, this);
        this.listenButton.on(cc.Node.EventType.TOUCH_END, this.handleListenButtonClick, this); // Listen button click event
    }

    protected start(): void {
        this.scheduleOnce(() => {
            this.loadNextQuestion();
        }, 1);
    }

    getCurrentRightAnswer() : string{
        return this.currentQuestion.correct_answer;
    }

    loadNextQuestion() {
        this.currentQuestion = this.quizManager.getQuizQuestion(this.currentQuestionIndex);
        console.log("Currect Question : "+this.currentQuestion);
        this.audioManager.loadClip(this.currentQuestion.audio_path);
        this.instantiateAnswerButtons();
    }

    handleListenButtonClick() {
        const audioPath = this.quizManager.getQuizQuestion(this.currentQuestionIndex).audio_path;
        this.audioManager.playClip();
    }

    instantiateAnswerButtons() {
        // Clear previous buttons
        this.answerButtonContainer.removeAllChildren();

        // Instantiate answer buttons
        const answers: string[] = this.getShuffledAnswers();
        answers.forEach(answer => {
            const buttonNode = cc.instantiate(this.answerButtonPrefab);
            var answerButton =  buttonNode.getComponent('AnswerButton');
            answerButton.setAnswerText(answer);
            if(answer == this.getCurrentRightAnswer()){
                this.correctAnswerButton = answerButton;
            }
            buttonNode.on(cc.Node.EventType.TOUCH_END, () => {
                this.handleAnswerButtonClick(buttonNode);
            });
            this.answerButtonContainer.addChild(buttonNode);
        });
    }

    handleAnswerButtonClick(answerButton: cc.Node) {
        console.log("Selected from the Controller");
        // Deselect other buttons
        this.answerButtonContainer.children.forEach(button => {
            if (button !== answerButton) {
                button.getComponent('AnswerButton').setSelected(false);
            }
        });

        // Update selected answer
        this.selectedAnswerButton = answerButton;
        answerButton.getComponent('AnswerButton').setSelected(true);
    }

    handleCheckButtonClick() {
        if (this.selectedAnswerButton) {
            // Check correctness of the selected answer
            const isCorrect = this.selectedAnswerButton.getComponent('AnswerButton').isCorrectAnswer(this.getCurrentRightAnswer());
            // Handle correctness (e.g., change color)
            if (isCorrect) {
                cc.log("Correct answer!");
                this.selectedAnswerButton.getComponent('AnswerButton').setCorrect();
            } else {
                cc.log("Incorrect answer!");
                this.correctAnswerButton.setCorrect();
                this.selectedAnswerButton.getComponent('AnswerButton').setIncorrect();
            }

            //Scedule
            this.scheduleOnce(() => {
                this.currentQuestionIndex++;
                this.loadNextQuestion();
            }, 3);

        } else {
            cc.log("No answer selected.");
        }
    }

    getShuffledAnswers(): string[] {
        const uniqueAnswers: Set<string> = new Set();
    
        // Add correct answer of current question
        uniqueAnswers.add(this.currentQuestion.correct_answer);
    
        // Add incorrect answers from other questions
        const numOptions = 4; // Number of options including correct answer
        const maxAttempts = 10; // Maximum attempts to find unique answers
        let attempts = 0;
        while (uniqueAnswers.size < numOptions && attempts < maxAttempts) {
            const randomIndex = Math.floor(Math.random() * this.quizManager.getQuizData().length);
            if (randomIndex !== this.currentQuestionIndex) {
                const question = this.quizManager.getQuizQuestion(randomIndex);
                if (question.correct_answer !== this.currentQuestion.correct_answer) {
                    uniqueAnswers.add(question.correct_answer);
                }
            }
            attempts++;
        }
    
        // Convert set to array
        const allAnswers = Array.from(uniqueAnswers);
    
        // Shuffle the array of answers
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
    
        // Make sure we have exactly 4 options
        return allAnswers.slice(0, numOptions);
    }
    

    handleAnswerClick(selectedAnswer: string) {
        if (selectedAnswer === this.currentQuestion.correct_answer) {
            // Handle correct answer
            console.log("correct answer");
        } else {
            // Handle wrong answer
            console.log("wrong answer");
        }
        // Move to next question
        this.currentQuestionIndex++;
        this.loadNextQuestion();
    }
}
