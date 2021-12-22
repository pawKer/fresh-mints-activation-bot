import mongoose from "mongoose";
import { MongoResultServerData } from "../../@types/bot";

const reqString: mongoose.SchemaDefinitionProperty = {
  type: String,
  required: true,
};
const noReqstring: mongoose.SchemaDefinitionProperty = {
  type: String,
  required: false,
};
const ServerSettingsSchema: mongoose.Schema<MongoResultServerData> =
  new mongoose.Schema<MongoResultServerData>({
    _id: reqString,
    alertChannelId: noReqstring,
    infoChannelId: noReqstring,
    areScheduledMessagesOn: {
      type: Boolean,
      default: false,
    },
    addressMap: Map,
    minutesToCheck: Number,
    schedule: String,
    alertRole: String,
    guildName: String,
    contractMap: Map,
    activated: {
      type: Boolean,
      default: false,
    },
    activatedAt: String,
  });

const ServerSettings: mongoose.Model<MongoResultServerData> =
  mongoose.model<MongoResultServerData>(
    "server-settings",
    ServerSettingsSchema
  );

export { ServerSettings };
