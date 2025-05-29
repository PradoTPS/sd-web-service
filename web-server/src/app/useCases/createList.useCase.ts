import { List } from "../../domain/entities/list.entity";
import { IListRepository } from "../../domain/repositories/iList.repository";
import { ICreateListDTOInput, ICreateListDTOOutput } from "../dto/createList.dto";

export class CreateListUseCase {
  constructor(private readonly ListRepository: IListRepository) {}

  async execute(data: ICreateListDTOInput): Promise<ICreateListDTOOutput> {

    const list = new List({
      name: data.name,
      playerId: data.playerId,
    });
    
    await this.ListRepository.create(list);

    return {
      list,
    };
  }
}
