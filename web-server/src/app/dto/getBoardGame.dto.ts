import { BoardGame } from "../../domain/entities/boardGame.entity";

export interface IGetBoardGameDTOInput {
  id: string;
}

export interface IGetBoardGameDTOOutput {
  boardGame: BoardGame;
}
