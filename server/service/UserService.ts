import { Player } from "./../model/User";
export class UserService {
  constructor() {}

  public login = async (username: string): Promise<Player | null> => {
    const loggedPlayer = Player.findOneBy({ username });
    return loggedPlayer;
  };
}
