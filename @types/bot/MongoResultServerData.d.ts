import { ServerDataDTO } from ".";

export interface MongoResultServerData extends ServerDataDTO {
  _id: string;
  __v: number;
}
