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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySocket = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const UserService_1 = require("./service/UserService");
const Game_1 = require("./Game");
const GameService_1 = require("./service/GameService");
class MySocket {
    constructor(express) {
        this.game = new Game_1.Game();
        this.userService = new UserService_1.UserService();
        this.gameService = new GameService_1.GameService();
        this.httpServer = http_1.default.createServer(express);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "http://localhost:3002",
                methods: ["GET", "POST"],
            },
        });
    }
    start() {
        this.players = [];
        this.io.on("connection", (socket) => {
            console.log("New client connected");
            socket.on("login_player", (data) => __awaiter(this, void 0, void 0, function* () {
                const player = yield this.userService.login(data.username);
                console.log(player);
                console.log(this.players);
                if (this.game.started) {
                    socket.emit("rec_login_player", null);
                    return;
                }
                if (player) {
                    if (this.players.filter((p) => p.id === player.id).length === 0) {
                        console.log("does not xist");
                        this.players.push(player);
                    }
                    socket.broadcast.emit("rec_login_player", this.players);
                    socket.emit("rec_login_player", this.players);
                    socket.emit("rec_logged", player);
                    this.game.addPlayer(player.username);
                }
                else {
                    socket.emit("rec_login_player", null);
                    //   socket.broadcast.emit("rec_login_player", null);
                }
            }));
            socket.on("start_game", (data) => __awaiter(this, void 0, void 0, function* () {
                const letters = this.game.startGame();
                console.log("Start game");
                console.log(letters);
                if (!letters) {
                    socket.emit("game_ended", null);
                    socket.broadcast.emit("game_ended", null);
                }
                else {
                    console.log("Sending letters");
                    socket.emit("game_started", { letters });
                    socket.broadcast.emit("game_started", { letters });
                }
            }));
            socket.on("word_submitted", (data) => __awaiter(this, void 0, void 0, function* () {
                const word = data.word;
                const username = data.username;
                const gameEnded = this.game.submitWord(username, word);
                console.log("Word submitted");
                console.log(word);
                console.log(username);
                if (gameEnded) {
                    console.log("Game ended");
                    this.game.started = false;
                    const points = this.game.getPoints();
                    console.log(points);
                    if (this.game.numberOfWords === 3) {
                        yield this.gameService.savePoints(this.game.overallScore, this.game.currentWord);
                        socket.emit("game_over", { points: this.game.overallScore });
                        socket.broadcast.emit("game_over", {
                            points: this.game.overallScore,
                        });
                    }
                    else {
                        socket.emit("game_ended", { points });
                        socket.broadcast.emit("game_ended", { points });
                    }
                }
            }));
        });
        this.httpServer.listen(3001, () => {
            console.log("Socket is running");
        });
    }
}
exports.MySocket = MySocket;
