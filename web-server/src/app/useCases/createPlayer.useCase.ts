import { Player } from "../../domain/entities/player.entity";
import { IPlayerRepository } from "../../domain/repositories/iPlayer.repository";
import { ICreatePlayerDTOInput, ICreatePlayerDTOOutput } from "../dto/createPlayer.dto";

export class CreatePlayerUseCase {
  constructor(private readonly PlayerRepository: IPlayerRepository) {}

  async execute(data: ICreatePlayerDTOInput): Promise<ICreatePlayerDTOOutput> {

    const player = new Player({
      name: data.name,
      email: data.email,
    });
    
    await this.PlayerRepository.create(player);

    return {
      player,
    };
  }
}
