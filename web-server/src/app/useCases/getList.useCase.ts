import { NotFound } from 'http-errors';
import { IListRepository } from "../../domain/repositories/iList.repository";
import { IGetListDTOInput, IGetListDTOOutput } from "../dto/getList.dto";

export class GetListUseCase {
  constructor(private readonly ListRepository: IListRepository) {}

  async execute(data: IGetListDTOInput): Promise<IGetListDTOOutput> {
    const list = await this.ListRepository.findById(data.id);

    if (!list) throw new NotFound(`List with id ${data.id} not found`);

    return {
      list,
    };
  }
}
