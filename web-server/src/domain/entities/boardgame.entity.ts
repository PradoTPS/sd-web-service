import { v4 } from 'uuid';

export interface IBoardGame<Date> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  link: string;
}

export class BoardGame {
  readonly #props: IBoardGame<Date>;

  constructor(
    props: {
      id?: string;
      createdAt?: Date;
      updatedAt?: Date;
      name: string;
      description: string;
      link: string;
    }
  ) {
    this.#props = {
      id: props.id ?? v4(),
      createdAt: new Date(props.createdAt ?? Date.now()),
      updatedAt: new Date(props.updatedAt ?? Date.now()),
      name: props.name,
      description: props.description,
      link: props.link,
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

  get description(): string {
    return this.#props.description;
  }

  get link(): string {
    return this.#props.link;
  }

  set name(name: string) {
    this.#props.name = name;
    this.#props.updatedAt = new Date();
  }

  set description(description: string) {
    this.#props.description = description;
    this.#props.updatedAt = new Date();
  }

  set link(link: string) {
    this.#props.link = link;
    this.#props.updatedAt = new Date();
  }

  toJSON(): IBoardGame<string> {
    return {
      ...this.#props,
      createdAt: this.#props.createdAt.toISOString(),
      updatedAt: this.#props.updatedAt.toISOString(),
    };
  }
}