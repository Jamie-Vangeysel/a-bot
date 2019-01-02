import { BotGuildConfig } from "./bot-guild-config";
import { EnabledEvents } from "./enabled-events";

export class BotConfig {
  public token: string;
  public prefix: string;
  public color: string;
  public guilds: BotGuildConfig[];
  public events: EnabledEvents;
}
