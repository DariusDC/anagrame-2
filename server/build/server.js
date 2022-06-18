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
exports.dataSource = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const socket_1 = require("./socket");
const User_1 = require("./model/User");
const GameStat_1 = require("./model/GameStat");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "anagrame",
    entities: [User_1.Player, GameStat_1.GameStat],
    synchronize: true,
    logging: false,
    name: "anagrame",
});
class Server {
    constructor() {
        this.app = express_1.default();
        this.mySocket = new socket_1.MySocket(this.app);
        this.configuration();
        this.routes();
    }
    configuration() {
        this.app.set("port", process.env.PORT || 3000);
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield exports.dataSource.initialize();
                console.log("Initialized");
                //   this.app.get("/", (req: Request, res: Response) => {
                //     res.send("Hello world!");
                //   });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    start() {
        this.app.use(express_1.default.json());
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server is listening ${this.app.get("port")} port.`);
        });
        this.mySocket.start();
    }
}
const server = new Server();
server.start();
// const game = new Game();
