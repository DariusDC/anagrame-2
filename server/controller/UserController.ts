import { Player } from "../model/User";
import { UserService } from "./../service/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  //   public login = async (player: Player): Promise<Player | null> => {
  //     return this.userService.login(player);
  //   };
}
