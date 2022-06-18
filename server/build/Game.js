"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor() {
        this.words = [];
        this.possibleWords = ["maria", "ana", "calul"];
        this.started = false;
        this.players = {};
        this.overallScore = {};
        this.numberOfWords = 0;
        this.startGame = () => {
            let word = this.generateWord();
            console.log(word);
            if (word === null)
                return null;
            this.currentWord = word;
            const letters = String.prototype.concat(...new Set(word)).split("");
            this.currentLetters = letters
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
            this.started = true;
            return this.currentLetters;
        };
        this.addPlayer = (username) => {
            if (!this.players[username]) {
                this.players[username] = null;
            }
        };
        this.submitWord = (username, word) => {
            this.players[username] = word;
            console.log(this.players);
            var allNotNull = true;
            for (const [key, value] of Object.entries(this.players)) {
                if (value === null)
                    allNotNull = false;
            }
            return allNotNull;
        };
        this.getPoints = () => {
            var points = {};
            for (const [key, value] of Object.entries(this.players)) {
                var noPoints = 0;
                for (let i = 0; i < value.length || i < this.currentWord.length; i++) {
                    if (value[i] === this.currentWord[i]) {
                        noPoints++;
                    }
                }
                points[key] = noPoints;
                if (!this.overallScore[key]) {
                    this.overallScore[key] = noPoints;
                }
                else {
                    this.overallScore[key] += noPoints;
                }
                this.players[key] = null;
            }
            points = {};
        };
    }
    reset() {
        this.words = [];
        this.currentLetters = [];
        this.currentWord = "";
        this.started = false;
        this.players = {};
        this.overallScore = {};
        this.numberOfWords = 0;
    }
    generateWord() {
        if (this.possibleWords.length === 0) {
            return null;
        }
        let randomIndex = Math.floor(Math.random() * this.possibleWords.length);
        let randomWord = this.possibleWords[randomIndex];
        this.numberOfWords++;
        if (this.numberOfWords <= 3)
            return randomWord;
        return null;
    }
}
exports.Game = Game;
