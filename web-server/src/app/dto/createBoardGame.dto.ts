import { BoardGame } from "../../domain/entities/boardgame.entity";

export interface ICreateBoardGameDTOInput {
  name: string;
  description: string;
  link: string;
}

export interface ICreateBoardGameDTOOutput {
  boardGame: BoardGame;
}