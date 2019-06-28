export interface iMojang {
  getuuid(username: string): Promise<ResolvedUUID>;
}

export class ResolvedUUID {
  public id: string;
  public name: string;
}