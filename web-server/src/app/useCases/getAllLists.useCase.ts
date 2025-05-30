import { IListRepository } from "../../domain/repositories/iList.repository";
import { IGetAllListsDTOOutput } from "../dto/getAllLists.dto";

export class GetAllListsUseCase {
  constructor(private readonly listRepository: IListRepository) {}

  async execute(): Promise<IGetAllListsDTOOutput> {
    const lists = await this.listRepository.findAll();

    return {
      lists,
    };
  }
}