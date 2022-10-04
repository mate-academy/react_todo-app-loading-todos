import { IUser } from '../types/User.interface';
import { client } from '../utils/fetchClient';

export const getUserByEmail = async (email: string) => {
  const users = await client.get<IUser[]>(`/users?email=${email}`);

  return users[0] || null;
};

type UserData = Pick<IUser, 'name' | 'email'>;

export const createUser = async ({ email, name }: UserData) => {
  return client.post<IUser>('/users', { email, name });
};
