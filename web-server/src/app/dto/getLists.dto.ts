import { List } from "../../domain/entities/list.entity";

export interface IGetListsDTOInput {
  playerId: string;
}

export interface IGetListsDTOOutput {
  lists: List[];
}
