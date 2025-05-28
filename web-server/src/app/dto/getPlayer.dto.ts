import { Player } from "../../domain/entities/player.entity";

export interface IGetPlayerDTOInput {
  id: string;
}

export interface IGetPlayerDTOOutput {
  player: Player;
}
