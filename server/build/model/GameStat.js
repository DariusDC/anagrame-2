"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStat = void 0;
const typeorm_1 = require("typeorm");
let GameStat = class GameStat extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GameStat.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], GameStat.prototype, "participants", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GameStat.prototype, "choosenWord", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GameStat.prototype, "winner", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GameStat.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], GameStat.prototype, "player", void 0);
GameStat = __decorate([
    typeorm_1.Entity("game_stat")
], GameStat);
exports.GameStat = GameStat;
