import { IPlayerRepository } from "../../domain/repositories/iPlayer.repository";
import { IGetPlayersDTOOutput } from "../dto/getPlayers.dto";

export class GetPlayersUseCase {
  constructor(private readonly PlayerRepository: IPlayerRepository) {}

  async execute(): Promise<IGetPlayersDTOOutput> {
    const players = await this.PlayerRepository.findAll();

    return {
      players,
    };
  }
}
