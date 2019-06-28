export interface iCrafatar {
  getBodyRender(uuid: string): Promise<Response>;
}