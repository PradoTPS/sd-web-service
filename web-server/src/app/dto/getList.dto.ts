import { List } from "../../domain/entities/list.entity";

export interface IGetListDTOInput {
  id: string;
}

export interface IGetListDTOOutput {
  list: List;
}
