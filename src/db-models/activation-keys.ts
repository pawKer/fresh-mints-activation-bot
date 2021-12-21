import mongoose from "mongoose";
import { MongoResultActivationKeys } from "../../@types/bot";

const reqString: mongoose.SchemaDefinitionProperty = {
  type: String,
  required: true,
  unique: true,
};

const ActivationKeysSchema: mongoose.Schema<MongoResultActivationKeys> =
  new mongoose.Schema<MongoResultActivationKeys>({
    _id: String,
    activationKey: reqString,
    used: {
      type: Boolean,
      required: true,
    },
    serverId: String,
    activatedAt: String,
  });

const ActivationKeys: mongoose.Model<MongoResultActivationKeys> =
  mongoose.model<MongoResultActivationKeys>(
    "activation-keys",
    ActivationKeysSchema
  );

export { ActivationKeys };
