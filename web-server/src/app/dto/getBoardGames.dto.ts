import { BoardGame } from "../../domain/entities/boardGame.entity";

export interface IGetBoardGamesDTOOutput {
  boardGames: BoardGame[];
}
