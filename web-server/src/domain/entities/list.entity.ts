import { v4 } from 'uuid';

export interface IBoardGame {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  link: string;
}

export interface IList {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  playerId: string;
  boardGames?: IBoardGame[];
}
export class List {
  readonly #props: IList;

  constructor(
    props: {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      name: string;
      playerId: string;
      boardGames?: IBoardGame[]; 
    }
  ) {
    this.#props = {
      id: props.id ?? v4(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      name: props.name,
      playerId: props.playerId,
      boardGames: props.boardGames?.map(boardGame => ({
        id: boardGame.id,
        createdAt: boardGame.createdAt ?? new Date(),
        updatedAt: boardGame.updatedAt ?? new Date(),
        name: boardGame.name,
        description: boardGame.description,
        link: boardGame.link,
      })) ?? [],
    };
  }

  get id(): string {
    return this.#props.id;
  }

  get createdAt(): Date {
    return this.#props.createdAt;
  }

  get updatedAt(): Date {
    return this.#props.updatedAt;
  }

  get name(): string {
    return this.#props.name;
  }

  get playerId(): string {
    return this.#props.playerId;
  }

  get boardGames(): IBoardGame[] {
    return this.#props.boardGames ?? [];
  }

  set name(name: string) {
    this.#props.name = name;
    this.#props.updatedAt = new Date();
  }

  toJSON(): IList {
    return {
      ...this.#props,
    };
  }
}