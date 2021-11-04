import { randomUUID } from 'crypto';

export interface IUser {
  id?: string;
  name: string;
  age: number;
  email: string;
}

export class User implements IUser {
  id: string;
  name: string;
  age: number;
  email: string;

  constructor(user?: IUser) {
    this.id = user.id ?? randomUUID();
    this.name = user.name;
    this.age = user.age;
    this.email = user.email;
  }
}
