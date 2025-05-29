import { List } from "../../domain/entities/list.entity";
import { CreateListUseCase } from "../useCases/createList.useCase";

export interface IResponse {
  body: {
    message: string;
    list: List;
  };
  statusCode: number;
}

export interface IEvent {
  name: string;
  playerId: string;
}

export class CreateListController {
  constructor(private readonly createListUseCase: CreateListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { list } = await this.createListUseCase.execute({
      name: event.name,
      playerId: event.playerId,
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully created!',
        list,
      },
    };
  }
}