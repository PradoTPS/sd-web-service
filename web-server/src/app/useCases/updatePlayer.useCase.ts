import { NotFound } from 'http-errors';
import { IPlayerRepository } from "../../domain/repositories/iPlayer.repository";
import { IUpdatePlayerDTOInput, IUpdatePlayerDTOOutput } from "../dto/updatePlayer.dto";

export class UpdatePlayerUseCase {
  constructor(private readonly PlayerRepository: IPlayerRepository) {}

  async execute(data: IUpdatePlayerDTOInput): Promise<IUpdatePlayerDTOOutput> {
    let player = await this.PlayerRepository.findById(data.id);

    if (!player) throw new NotFound(`Player with id ${data.id} not found`);

    player = await this.PlayerRepository.update(player, {
      name: data.name,
      email: data.email,
    });

    return {
      player,
    }
  }
}
