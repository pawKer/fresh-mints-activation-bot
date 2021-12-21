import { MongoResultActivationKeys } from "../../@types/bot";
import { IActivationKeysRepository } from "../../@types/bot/IActivationKeysRepository";
import { ActivationKeys } from "../db-models/activation-keys";

class ActivationKeysRepository implements IActivationKeysRepository {
  async save(id: string, data: any): Promise<void> {
    try {
      await ActivationKeys.create({
        _id: id,
        ...data,
      });
      console.log(`[user: ${id}] - Created new activation key!`);
    } catch (error) {
      console.error(`user: ${id}`, error);
      throw error;
    }
  }

  async find(id: string): Promise<MongoResultActivationKeys | null> {
    let res: MongoResultActivationKeys | null;
    try {
      res = (await ActivationKeys.findOne({
        _id: id,
      })) as MongoResultActivationKeys;
      console.log(`[user: ${id}] - Fetched data from DB`);
      return res;
    } catch (error) {
      console.error(`user: ${id}`, error);
      throw error;
    }
  }

  async findAllUsedKeys(): Promise<MongoResultActivationKeys[] | null> {
    let res: MongoResultActivationKeys[] | null;
    try {
      res = (await ActivationKeys.find({
        used: true,
      })) as MongoResultActivationKeys[];
      console.log(`Fetched all used keys from DB.`);
      return res;
    } catch (error) {
      console.error(`Error fetching all used keys`, error);
      throw error;
    }
  }
}
export { ActivationKeysRepository };
