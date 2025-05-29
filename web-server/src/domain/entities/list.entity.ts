import { v4 } from 'uuid';

export interface IBoardGame<Date> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  link: string;
}

export interface IList<Date> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  playerId: string;
  boardGames?: IBoardGame<Date>[];
}
export class List {
  readonly #props: IList<Date>;

  constructor(
    props: {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      name: string;
      playerId: string;
      boardGames?: IBoardGame<Date>[]; 
    }
  ) {
    this.#props = {
      id: props.id ?? v4(),
      createdAt: new Date(props.createdAt ?? Date.now()),
      updatedAt: new Date(props.updatedAt ?? Date.now()),
      name: props.name,
      playerId: props.playerId,
      boardGames: props.boardGames?.map(boardGame => ({
        id: boardGame.id,
        createdAt: new Date(props.createdAt ?? Date.now()),
      updatedAt: new Date(props.updatedAt ?? Date.now()),
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

  get boardGames(): IBoardGame<Date>[] {
    return this.#props.boardGames ?? [];
  }

  set name(name: string) {
    this.#props.name = name;
    this.#props.updatedAt = new Date(Date.now());
  }

  toJSON(): IList<string> {
    return {
      ...this.#props,
      createdAt: this.#props.createdAt.toISOString(),
      updatedAt: this.#props.updatedAt.toISOString(),
      boardGames: this.#props.boardGames?.map(boardGame => ({
        ...boardGame,
        createdAt: boardGame.createdAt.toISOString(),
        updatedAt: boardGame.updatedAt.toISOString(),
      })) ?? [],
    };
  }
}