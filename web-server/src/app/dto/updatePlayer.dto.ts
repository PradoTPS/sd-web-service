import { Player } from "../../domain/entities/player.entity";

export interface IUpdatePlayerDTOInput {
  id: string;
  name?: string;
  email?: string;
}

export interface IUpdatePlayerDTOOutput {
  player: Player;
}