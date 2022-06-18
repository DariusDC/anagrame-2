import { Socket, Server } from "socket.io";
import http from "http";
import { Application } from "express";
import { Player } from "./model/User";
import { UserService } from "./service/UserService";
import { Game } from "./Game";
import { GameService } from "./service/GameService";

export class MySocket {
  public io: Server;
  public httpServer: http.Server;
  private players: Player[];
  private userService: UserService;
  private gameService: GameService;
  private game: Game;

  constructor(express: Application) {
    this.game = new Game();
    this.userService = new UserService();
    this.gameService = new GameService();
    this.httpServer = http.createServer(express);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"],
      },
    });
  }

  public start() {
    this.players = [];
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected");

      socket.on("login_player", async (data) => {
        const player = await this.userService.login(data.username);
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
        } else {
          socket.emit("rec_login_player", null);
          //   socket.broadcast.emit("rec_login_player", null);
        }
      });

      socket.on("start_game", async (data) => {
        const letters = this.game.startGame();
        console.log("Start game");
        console.log(letters);

        if (!letters) {
          socket.emit("game_ended", null);
          socket.broadcast.emit("game_ended", null);
        } else {
          console.log("Sending letters");

          socket.emit("game_started", { letters });
          socket.broadcast.emit("game_started", { letters });
        }
      });

      socket.on("word_submitted", async (data) => {
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
            await this.gameService.savePoints(
              this.game.overallScore,
              this.game.currentWord
            );

            socket.emit("game_over", { points: this.game.overallScore });
            socket.broadcast.emit("game_over", {
              points: this.game.overallScore,
            });
          } else {
            socket.emit("game_ended", { points });
            socket.broadcast.emit("game_ended", { points });
          }
        }
      });
    });

    this.httpServer.listen(3001, () => {
      console.log("Socket is running");
    });
  }
}
