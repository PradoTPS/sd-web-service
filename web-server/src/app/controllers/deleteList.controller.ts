import { DeleteListUseCase } from "../useCases/deleteList.useCase";

export interface IResponse {
  body: {
    message: string;
  };
  statusCode: number;
}

export interface IEvent {
  listId: string;
}

export class DeleteListController {
  constructor(private readonly deleteListUseCase: DeleteListUseCase) {}

  async handle(event: IEvent): Promise<IResponse> {
    await this.deleteListUseCase.execute({
      id: event.listId
    });

    return {
      statusCode: 200,
      body: {
        message: 'List successfully deleted!'
      },
    };
  }
}