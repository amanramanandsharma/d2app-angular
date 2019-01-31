export class User {
  constructor(public account_id: number, public personaname: string, public avatarfull: string, public similarity: number) {}
}

export interface IUserResponse {
  results: User[];
}