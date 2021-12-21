import { Client, Collection } from "discord.js";
import {
  Command,
  DiscordEvent,
  IActivationKeysRepository,
  IServerSettingsRepository,
} from ".";
interface DiscordClient extends Client {
  commands: Collection<string, Command>;
  events: Collection<string, DiscordEvent>;
  serverSettingsRepo: IServerSettingsRepository;
  activationKeysRepo: IActivationKeysRepository;
}
