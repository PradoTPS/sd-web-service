import { List } from "../../domain/entities/list.entity";

export interface IUpdateListDTOInput {
  id: string;
  name?: string;
  boardGameIds?: string[];
}

export interface IUpdateListDTOOutput {
  list: List;
}