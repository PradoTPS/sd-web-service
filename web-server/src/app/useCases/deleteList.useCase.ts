import { IListRepository } from "../../domain/repositories/iList.repository";
import { IDeleteListDTOInput } from "../dto/deleteList.dto";

export class DeleteListUseCase {
  constructor(private readonly ListRepository: IListRepository) {}

  async execute(data: IDeleteListDTOInput): Promise<void> {
    const list = await this.ListRepository.findById(data.id);

    if (list) await this.ListRepository.delete(list);
  }
}
