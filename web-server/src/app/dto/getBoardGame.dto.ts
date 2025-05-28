import { BoardGame } from "../../domain/entities/boardgame.entity";

export interface IGetBoardGameDTOInput {
  id: string;
}

export interface IGetBoardGameDTOOutput {
  boardGame: BoardGame;
}
