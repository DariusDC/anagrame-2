import { MySocket } from "./socket";

export class Game {
  public words: string[] = [];
  private possibleWords: string[] = ["maria", "ana", "calul"];
  private currentLetters: string[];
  public currentWord: string;
  public started: boolean = false;
  private players: any = {};
  public overallScore: any = {};
  public numberOfWords = 0;

  constructor() {}

  public reset() {
    this.words = [];
    this.currentLetters = [];
    this.currentWord = "";
    this.started = false;
    this.players = {};
    this.overallScore = {};
    this.numberOfWords = 0;
  }

  public generateWord(): string | null {
    if (this.possibleWords.length === 0) {
      return null;
    }
    let randomIndex: number = Math.floor(
      Math.random() * this.possibleWords.length
    );
    let randomWord: string = this.possibleWords[randomIndex];
    this.numberOfWords++;
    if (this.numberOfWords <= 3) return randomWord;
    return null;
  }

  public startGame = () => {
    let word = this.generateWord();
    console.log(word);

    if (word === null) return null;

    this.currentWord = word;
    const letters = String.prototype.concat(...new Set(word)).split("");
    this.currentLetters = letters
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    this.started = true;
    return this.currentLetters;
  };

  public addPlayer = (username: string) => {
    if (!this.players[username]) {
      this.players[username] = null;
    }
  };

  public submitWord = (username: string, word: string) => {
    this.players[username] = word;
    console.log(this.players);

    var allNotNull = true;
    for (const [key, value] of Object.entries(this.players)) {
      if (value === null) allNotNull = false;
    }

    return allNotNull;
  };

  public getPoints = (): any => {
    var points: any = {};
    for (const [key, value] of Object.entries(this.players)) {
      var noPoints: number = 0;
      for (
        let i = 0;
        i < (value as string).length || i < this.currentWord.length;
        i++
      ) {
        if ((value as string)[i] === this.currentWord[i]) {
          noPoints++;
        }
      }
      points[key as string] = noPoints;
      if (!this.overallScore[key as string]) {
        this.overallScore[key as string] = noPoints;
      } else {
        this.overallScore[key as string] += noPoints;
      }
      this.players[key] = null;
    }
    points = {};
  };
}
