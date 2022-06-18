"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const GameStat_1 = require("./../model/GameStat");
class GameService {
    constructor() {
        this.savePoints = (points, choosenWord) => __awaiter(this, void 0, void 0, function* () {
            var maxUsername = null;
            var maxPoints = 0;
            const participants = [];
            for (const [key, value] of Object.entries(points)) {
                if (value > maxPoints) {
                    maxPoints = value;
                    maxUsername = key;
                }
                participants.push(key);
            }
            for (const [key, value] of Object.entries(points)) {
                const stat = {
                    participants,
                    choosenWord,
                    winner: maxUsername,
                    points: value,
                    player: key,
                };
                yield GameStat_1.GameStat.save(stat);
            }
        });
    }
}
exports.GameService = GameService;
