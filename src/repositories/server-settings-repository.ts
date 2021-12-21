import {
  IServerSettingsRepository,
  MongoResultServerData,
  ServerDataDTO,
} from "../../@types/bot";
import { ServerSettings } from "../db-models/server-settings";

class ServerSettingsRepository implements IServerSettingsRepository {
  async save(serverId: string, serverSettings: ServerDataDTO): Promise<void> {
    try {
      await ServerSettings.findOneAndUpdate(
        {
          _id: serverId,
        },
        serverSettings,
        {
          upsert: true,
        }
      );
      console.log(`[${serverId}] - Saved server settings!`);
    } catch (error) {
      console.error(`${serverId}`, error);
    }
  }

  async find(serverId: string): Promise<MongoResultServerData | null> {
    let res: MongoResultServerData | null;
    try {
      res = (await ServerSettings.findOne({
        _id: serverId,
      })) as MongoResultServerData;
      console.log(`[${serverId}] - Fetched data from DB`);
      return res;
    } catch (error) {
      console.error(`${serverId}`, error);
    }
    return Promise.reject();
  }
}
export { ServerSettingsRepository };
