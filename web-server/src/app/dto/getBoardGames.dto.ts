import { BoardGame } from "../../domain/entities/boardgame.entity";

export interface IGetBoardGamesDTOOutput {
  boardGames: BoardGame[];
}
