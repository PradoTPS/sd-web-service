import { v4 } from 'uuid';

export interface IList {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IPlayer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  lists?: IList[];
}

export class Player {
  readonly #props: IPlayer;

  constructor(
    props: {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      name: string;
      email: string;
      lists?: IList[];
    }
  ) {
    this.#props = {
      id: props.id ?? v4(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      name: props.name,
      email: props.email,
      lists: props.lists?.map(list => ({
        id: list.id,
        createdAt: list.createdAt ?? new Date(),
        updatedAt: list.updatedAt ?? new Date(),
        name: list.name,
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

  get email(): string {
    return this.#props.email;
  }

  get lists(): IList[] {
    return this.#props.lists ?? [];
  }

  set name(name: string) {
    this.#props.name = name;
    this.#props.updatedAt = new Date();
  }

  set email(email: string) {
    this.#props.email = email;
    this.#props.updatedAt = new Date();
  }

  toJSON(): IPlayer {
    return {
      ...this.#props,
    };
  }
}