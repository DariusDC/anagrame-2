import { GameStat } from "./../model/GameStat";

export class GameService {
  constructor() {}

  public savePoints = async (points: any, choosenWord: string) => {
    var maxUsername = null;
    var maxPoints: number = 0;
    const participants: string[] = [];
    for (const [key, value] of Object.entries(points)) {
      if ((value as number) > maxPoints) {
        maxPoints = value as number;
        maxUsername = key;
      }
      participants.push(key);
    }
    for (const [key, value] of Object.entries(points)) {
      const stat: any = {
        participants,
        choosenWord,
        winner: maxUsername,
        points: value,
        player: key,
      };
      await GameStat.save(stat as GameStat);
    }
  };
}
