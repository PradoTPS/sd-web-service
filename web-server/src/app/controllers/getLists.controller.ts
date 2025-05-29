import { List } from "../../domain/entities/list.entity";
import { GetListsUseCase } from "../useCases/getLists.useCase";

export interface IResponse {
  body: {
    message: string;
    lists: List[];
  };
  statusCode: number;
}

export interface IEvent {
  playerId: string;
}

export class GetListsController {
  constructor(private readonly getListsUseCase: GetListsUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    const { lists } = await this.getListsUseCase.execute({
      playerId: event.playerId,
    });

    return {
      statusCode: 200,
      body: {
        message: `Lists of Player ${event.playerId} successfully fetched!`,
        lists,
      },
    };
  }
}