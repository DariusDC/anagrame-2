import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_stat")
export class GameStat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ array: true })
  participants: string;

  @Column()
  choosenWord: string;

  @Column()
  winner: string;

  @Column()
  points: number;

  @Column({ nullable: true })
  player: string;
}
