import { List } from "../../domain/entities/list.entity";

export interface ICreateListDTOInput {
  name: string;
  playerId: string;
  boardGameIds?: string[];
}

export interface ICreateListDTOOutput {
  list: List;
}