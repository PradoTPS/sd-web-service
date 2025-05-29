import { NotFound } from 'http-errors';
import { IListRepository } from "../../domain/repositories/iList.repository";
import { IUpdateListDTOInput, IUpdateListDTOOutput } from "../dto/updateList.dto";

export class UpdateListUseCase {
  constructor(private readonly ListRepository: IListRepository) {}

  async execute(data: IUpdateListDTOInput): Promise<IUpdateListDTOOutput> {
    let list = await this.ListRepository.findById(data.id);

    if (!list) throw new NotFound(`List with id ${data.id} not found`);

    list = await this.ListRepository.update(list, {
      name: data.name,
      boardGameIds: data.boardGameIds,
    });

    return {
      list,
    }
  }
}
