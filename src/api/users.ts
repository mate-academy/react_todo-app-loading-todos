import User from 'models/User';
import { HttpClient } from '../utilities/HttpClient';

export const getUserByEmail = async (email: string) => {
  const users = await HttpClient.get<User[]>(`/users?email=${email}`);

  return users[0] || null;
};

type UserData = Pick<User, 'name' | 'email'>;

export const createUser = async ({ email, name }: UserData) => {
  return HttpClient.post<Omit<User, 'id'>>('/users', { email, name });
};
