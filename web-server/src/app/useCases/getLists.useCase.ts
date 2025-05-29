import { IListRepository } from "../../domain/repositories/iList.repository";
import { IGetListsDTOInput, IGetListsDTOOutput } from "../dto/getLists.dto";

export class GetListsUseCase {
  constructor(private readonly ListRepository: IListRepository) {}

  async execute(data: IGetListsDTOInput): Promise<IGetListsDTOOutput> {
    const lists = await this.ListRepository.findByPlayerId(data.playerId);

    return {
      lists,
    };
  }
}
