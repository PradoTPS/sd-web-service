import { v4 } from 'uuid';

export interface IBoardGame {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  link: string;
}

export class BoardGame {
  readonly #props: IBoardGame;

  constructor(
    props: IBoardGame
  ) {
    this.#props = {
      id: props.id ?? v4(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
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

  toJSON(): IBoardGame {
    return {
      ...this.#props,
    };
  }
}