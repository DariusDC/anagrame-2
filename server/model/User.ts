import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("player")
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
}
