import { BotMemberConfig } from "./bot-member-config";
import { BotChannelConfig } from "./bot-channel-config";
import { EnabledEvents } from "./enabled-events";

export class BotGuildConfig {
  public id: string;
  public name: string;
  public adminRole: string;
  public moderatorRole: string;
  public members: BotMemberConfig[];
  public channels: BotChannelConfig[];
  public events: EnabledEvents;
}
