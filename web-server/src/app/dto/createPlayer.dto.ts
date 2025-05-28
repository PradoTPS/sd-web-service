import { Player } from "../../domain/entities/player.entity";

export interface ICreatePlayerDTOInput {
  name: string;
  email: string;
}

export interface ICreatePlayerDTOOutput {
  player: Player;
}