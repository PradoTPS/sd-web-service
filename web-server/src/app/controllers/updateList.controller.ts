import { List } from "../../domain/entities/list.entity";
import { UpdateListUseCase } from "../useCases/updateList.useCase";

export interface IResponse {
  body: {
    message: string;
    list: List;
  };
  statusCode: number;
}

export interface IEvent {
  listId: string;
  name?: string;
  boardGames?: string[];
}

export class UpdateListController {
  constructor(private readonly updateListUseCase: UpdateListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.updateListUseCase.execute({
      id: event.listId,
      name: event.name,
      boardGameIds: event.boardGames,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully updated!',
        list,
      },
    };
  }
}