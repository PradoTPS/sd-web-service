import { NotFound } from 'http-errors';
import { IPlayerRepository } from "../../domain/repositories/iPlayer.repository";
import { IGetPlayerDTOInput, IGetPlayerDTOOutput } from "../dto/getPlayer.dto";

export class GetPlayerUseCase {
  constructor(private readonly PlayerRepository: IPlayerRepository) {}

  async execute(data: IGetPlayerDTOInput): Promise<IGetPlayerDTOOutput> {
    const player = await this.PlayerRepository.findById(data.id);

    if (!player) throw new NotFound(`Player with id ${data.id} not found`);

    return {
      player,
    };
  }
}
