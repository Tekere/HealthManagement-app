// ドキュメント性を上げるためのinterfaceたち
interface Scoreable {
  readonly totalScore: number;
  render(): void;
}

interface Foodable {
  element: HTMLDivElement;
  clickEventHandler(): void;
}

interface Foodsable {
  elements: NodeListOf<HTMLDivElement>;
  readonly activeElements: HTMLDListElement[];
  readonly activeElementsScore: number[];
}

//

// ここからが処理

class Score implements Scoreable {
  private constructor() {}
  // シングルトン
  private static instance: Score;
  get totalScore() {
    const foods = Foods.getInstance();
    return foods.activeElemetsScore.reduce((total, score) => total + score, 0);
  }
  render() {
    document.querySelector(".score__number")!.textContent = String(
      this.totalScore
    );
  }

  static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}
class Food implements Foodable {
  constructor(public element: HTMLDivElement) {
    element.addEventListener("click", this.clickEventHandler.bind(this));
  }
  clickEventHandler() {
    this.element.classList.toggle("food--active");
    const score = Score.getInstance();
    score.render();
  }
}
class Foods {
  // シングルトン
  private static instance: Foods;
  // .foodクラスのセレクタを全て取得する。 divです宣言
  elements = document.querySelectorAll<HTMLDivElement>(".food");
  // アクティブなfoodセレクタを入れておくための配列。 divしか入りません宣言
  private _activeElements: HTMLDivElement[] = [];
  //
  private _activeElementsScore: number[] = [];
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
  private constructor() {
    // .foodのセレクタを回して Foodクラスのインスタンスを作成
    this.elements.forEach((element) => {
      new Food(element);
    });
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
