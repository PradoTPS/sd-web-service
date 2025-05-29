import { List } from "../../domain/entities/list.entity";

export interface ICreateListDTOInput {
  name: string;
  playerId: string;
}

export interface ICreateListDTOOutput {
  list: List;
}