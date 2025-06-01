import { List } from "../../domain/entities/list.entity";
import { NotFound } from 'http-errors';
import { IBoardGameRepository } from "../../domain/repositories/iBoardGame.repository";
import { IListRepository } from "../../domain/repositories/iList.repository";
import { ICreateListDTOInput, ICreateListDTOOutput } from "../dto/createList.dto";

export class CreateListUseCase {
  constructor(private readonly ListRepository: IListRepository, private readonly BoardGameRepository: IBoardGameRepository) {}

  async execute(data: ICreateListDTOInput): Promise<ICreateListDTOOutput> {

    const boardGames = [];

    for (const boardGameId of data.boardGameIds || []) {
      const boardGame = await this.BoardGameRepository.findById(boardGameId);
      if (!boardGame) throw new NotFound(`Board game with id ${boardGameId} not found`);
      boardGames.push(boardGame);
    }

    const list = new List({
      name: data.name,
      playerId: data.playerId,
      boardGames,
    });
    
    await this.ListRepository.create(list);

    return {
      list,
    };
  }
}
