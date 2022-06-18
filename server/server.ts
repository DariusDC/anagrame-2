import express, { Request, Response } from "express";
import { DataSource } from "typeorm";
import { MySocket } from "./socket";
import { Game } from "./Game";
import { Player } from "./model/User";
import { GameStat } from "./model/GameStat";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "anagrame",
  entities: [Player, GameStat],
  synchronize: true,
  logging: false,
  name: "anagrame",
});

class Server {
  private app: express.Application;
  private mySocket: MySocket;

  constructor() {
    this.app = express();
    this.mySocket = new MySocket(this.app);
    this.configuration();
    this.routes();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
  }

  public async routes() {
    try {
      await dataSource.initialize();
      console.log("Initialized");

      //   this.app.get("/", (req: Request, res: Response) => {
      //     res.send("Hello world!");
      //   });
    } catch (e) {
      console.log(e);
    }
  }

  public start() {
    this.app.use(express.json());
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening ${this.app.get("port")} port.`);
    });
    this.mySocket.start();
  }
}

const server = new Server();
server.start();

// const game = new Game();
