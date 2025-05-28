import { v4 } from 'uuid';

export interface IList {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IPlayer<Date> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  lists?: IList[];
}

export class Player {
  readonly #props: IPlayer<Date>;

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
      createdAt: new Date(props.createdAt ?? Date.now()),
      updatedAt: new Date(props.updatedAt ?? Date.now()),
      name: props.name,
      email: props.email,
      lists: props.lists?.map(list => ({
        id: list.id,
        createdAt: new Date(props.createdAt ?? Date.now()),
        updatedAt: new Date(props.updatedAt ?? Date.now()),
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
    this.#props.updatedAt = new Date(Date.now());
  }

  set email(email: string) {
    this.#props.email = email;
    this.#props.updatedAt = new Date(Date.now());
  }

  toJSON(): IPlayer<string> {
    return {
      ...this.#props,
      createdAt: this.#props.createdAt.toISOString(),
      updatedAt: this.#props.updatedAt.toISOString(),
    };
  }
}