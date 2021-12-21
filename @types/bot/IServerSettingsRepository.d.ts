import { MongoResultServerData, ServerDataDTO } from ".";

export interface IServerSettingsRepository {
  save(id: string, data: ServerDataDTO): Promise<void>;
  find(id: string): Promise<MongoResultServerData | null>;
}
