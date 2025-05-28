import { BoardGame } from "../../domain/entities/boardgame.entity";

export interface IUpdateBoardGameDTOInput {
  id: string;
  name?: string;
  description?: string;
  link?: string;
}

export interface IUpdateBoardGameDTOOutput {
  boardGame: BoardGame;
}