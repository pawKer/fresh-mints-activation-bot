import { ActivationKeyDTO, MongoResultActivationKeys } from ".";

export interface IActivationKeysRepository {
  save(id: string, data: ActivationKeyDTO): Promise<void>;
  find(id: string): Promise<MongoResultActivationKeys | null>;
  findAllUsedKeys(): Promise<MongoResultActivationKeys[] | null>;
}
