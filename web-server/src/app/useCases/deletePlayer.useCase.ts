import { IPlayerRepository } from "../../domain/repositories/iPlayer.repository";
import { IDeletePlayerDTOInput } from "../dto/deletePlayer.dto";

export class DeletePlayerUseCase {
  constructor(private readonly PlayerRepository: IPlayerRepository) {}

  async execute(data: IDeletePlayerDTOInput): Promise<void> {
    const player = await this.PlayerRepository.findById(data.id);

    if (player) await this.PlayerRepository.delete(player);
  }
}
