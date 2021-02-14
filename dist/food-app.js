"use strict";
//
// ここからが処理
class Score {
    constructor() { }
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElemetsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector(".score__number").textContent = String(this.totalScore);
    }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
class Food {
    constructor(element) {
        this.element = element;
        element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        this.element.classList.toggle("food--active");
        const score = Score.getInstance();
        score.render();
    }
}
class Foods {
    constructor() {
        // .foodクラスのセレクタを全て取得する。 divです宣言
        this.elements = document.querySelectorAll(".food");
        // アクティブなfoodセレクタを入れておくための配列。 divしか入りません宣言
        this._activeElements = [];
        //
        this._activeElementsScore = [];
        // .foodのセレクタを回して Foodクラスのインスタンスを作成
        this.elements.forEach((element) => {
            new Food(element);
        });
    }
    // アクティブなセレクタを取得して _activeElementsに入れる
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach((element) => {
            if (element.classList.contains("food--active")) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    //
    get activeElemetsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach((element) => {
            const foodScore = element.querySelector(".food__score");
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    // シングルトン
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();
