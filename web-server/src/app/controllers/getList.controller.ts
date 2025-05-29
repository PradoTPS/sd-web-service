import { List } from "../../domain/entities/list.entity";
import { GetListUseCase } from "../useCases/getList.useCase";

export interface IResponse {
  body: {
    message: string;
    list: List;
  };
  statusCode: number;
}

export interface IEvent {
  listId: string;
}

export class GetListController {
  constructor(private readonly getListUseCase: GetListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.getListUseCase.execute({
      id: event.listId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully fetched!',
        list,
      },
    };
  }
}